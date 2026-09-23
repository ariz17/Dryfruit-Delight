const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_do_not_use_in_prod');
const { generateInvoicePDF } = require('../utils/pdfGenerator');

const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) return res.status(400).json({ message: 'No order items' });

  try {
    const order = new Order({
      orderItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, isPaid: false
    });
    const createdOrder = await order.save();

    let checkoutUrl = null;
    if (paymentMethod === 'Stripe') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100)
          },
          quantity: item.qty
        })),
        mode: 'payment',
        success_url: `http://localhost:3000/order/${order._id}?success=true`,
        cancel_url: `http://localhost:3000/cart?canceled=true`
      });
      checkoutUrl = session.url;
    }
    res.status(201).json({ order: createdOrder, checkoutUrl });
  } catch {
    res.status(500).json({ message: 'Server error processing order checkout' });
  }
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.query.format === 'pdf') {
    return generateInvoicePDF(order, (pdfBuffer) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=Invoice_${order._id}.pdf`);
      res.send(pdfBuffer);
    });
  }
  res.json(order);
};

const getOrders = async (req, res) => {
  res.json(await Order.find({}).populate('user', 'id name'));
};

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { id: req.body.id, status: req.body.status };
    res.json(await order.save());
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

module.exports = { createOrder, getOrderById, updateOrderToPaid, getOrders };
