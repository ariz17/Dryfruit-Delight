const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_do_not_use_in_prod');
const { generateInvoicePDF } = require('../utils/pdfGenerator');

// @desc    Create new order & Checkout Session
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    // 1. Save The Order in DB Pending Payment
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: false
    });
    const createdOrder = await order.save();

    // 2. Optional: Generate Stripe Payment Gateway Checkout Link
    let checkoutUrl = null;
    if (paymentMethod === 'Stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100), // Stripe expects smallest currency unit (paise)
          },
          quantity: item.qty,
        })),
        mode: 'payment',
        success_url: `http://localhost:3000/order/${order._id}?success=true`,
        cancel_url: `http://localhost:3000/cart?canceled=true`,
      });
      checkoutUrl = session.url;
    }

    res.status(201).json({ order: createdOrder, checkoutUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server error processing order checkout' });
  }
};

// @desc    Get order by ID & Download PDF
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Feature: If the frontend requests a PDF (?format=pdf), stream the file
  if (req.query.format === 'pdf') {
    generateInvoicePDF(order, (pdfBuffer) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=Invoice_${order._id}.pdf`);
      res.send(pdfBuffer);
    });
    return;
  }

  // Otherwise, return JSON
  res.json(order);
};

// @desc    Get all orders (Admin only chart analytic endpoint)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

// @desc    Mock Webhook to set Order to Paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { id: req.body.id, status: req.body.status }; // From Stripe callback
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

module.exports = { createOrder, getOrderById, updateOrderToPaid, getOrders };
