const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a beautiful PDF Invoice dynamically for the customer.
 * In a real-world scenario, you would stream this back to the user or attach it to an email.
 */
const generateInvoicePDF = (order, callback) => {
  const doc = new PDFDocument({ margin: 50 });
  
  // Create a buffer chunk array to collect the PDF stream data
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    callback(pdfData);
  });

  // --- PDF Styling & Content ---
  doc.fillColor('#444444')
     .fontSize(20)
     .text('Dryfruit Delight', 50, 57)
     .fontSize(10)
     .text('Premium Quality Nuts & Berries', 50, 80)
     .text('Invoice Number: ' + order._id, 50, 95)
     .moveDown();

  doc.fillColor('#000000')
     .fontSize(15)
     .text('Receipt for Your Order', { align: 'center' })
     .moveDown();

  doc.fontSize(12).text(`Billed To: ${order.user.name}`);
  doc.text(`Email: ${order.user.email}`);
  doc.text(`Shipping Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}`);
  doc.moveDown();

  // Draw Table Header
  doc.font('Helvetica-Bold');
  doc.text('Item', 50, 250);
  doc.text('Qty', 300, 250);
  doc.text('Price', 400, 250);
  doc.moveTo(50, 265).lineTo(500, 265).stroke();
  doc.font('Helvetica');

  // Draw Items
  let position = 280;
  order.orderItems.forEach(item => {
    doc.text(item.name, 50, position);
    doc.text(item.qty.toString(), 300, position);
    doc.text('Rs. ' + item.price.toFixed(2), 400, position);
    position += 20;
  });

  doc.moveTo(50, position + 10).lineTo(500, position + 10).stroke();
  
  // Totals
  doc.font('Helvetica-Bold');
  doc.text('Total Amount Paid: ', 300, position + 30);
  doc.fillColor('green').text('Rs. ' + order.totalPrice.toFixed(2), 420, position + 30);

  doc.moveDown(3);
  doc.fillColor('#444444').fontSize(10).text('Thank you for trusting Dryfruit Delight for your nutrition needs!', { align: 'center' });

  // Finalize the PDF file
  doc.end();
};

module.exports = { generateInvoicePDF };
