import { Order } from '../database/models/index.js';
export const getAllOrders = async (limit = 20, offset = 0) => {
  return await Order.findAndCountAll({ limit, offset });
};
export const getOrderById = async (id) => {
  return await Order.findByPk(id);
};
export const createOrder = async (data, user) => {
  const auditLog = { createdBy: user.email, createdOn: new Date() };
  const order = await Order.create({ ...data, userEmail: user.email, auditLog });
  console.log('Order Created!');
  return order;
};
export const updateOrderStatus = async (id, status, user) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order Not Found!');
  const auditLog = { ...order.auditLog, updatedBy: user.email, updatedOn: new Date() };
  await order.update({ status, auditLog });
  console.log('Order Status Updated!');
  return order;
};
export const updateItemStatus = async (orderId, itemId, status, details, user) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order Not Found!');
  const items = order.items;
  const itemIndex = items.findIndex(i => i._id === itemId || i.id === itemId);
  if (itemIndex === -1) throw new Error('Item Not Found!');
  items[itemIndex].status = status;
  if (details) {
    items[itemIndex].details = { ...items[itemIndex].details, ...details };
  }
  const auditLog = { ...order.auditLog, updatedBy: user.email, updatedOn: new Date() };
  order.changed('items', true);
  order.changed('auditLog', true);
  await order.update({ items, auditLog });
  return order;
};
export const addComment = async (orderId, content, user) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order Not Found!');
  const auditLog = order.auditLog || {};
  if (!auditLog.comments) auditLog.comments = [];
  auditLog.comments.push({ content, user: user.email, date: new Date() });
  order.changed('auditLog', true);
  await order.update({ auditLog });
  return order;
};
export const editComment = async (orderId, commentIndex, content, user) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order Not Found!');
  const auditLog = order.auditLog;
  if (auditLog.comments && auditLog.comments[commentIndex]) {
    auditLog.comments[commentIndex].content = content;
    auditLog.comments[commentIndex].updatedBy = user.email;
    auditLog.comments[commentIndex].updatedOn = new Date();
    order.changed('auditLog', true);
    await order.update({ auditLog });
  }
  return order;
};
export const deleteComment = async (orderId, commentIndex) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order Not Found!');
  const auditLog = order.auditLog;
  if (auditLog.comments) {
    auditLog.comments.splice(commentIndex, 1);
    order.changed('auditLog', true);
    await order.update({ auditLog });
  }
  return order;
};