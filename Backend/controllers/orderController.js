import * as orderService from '../services/orderService.js';
export const getOrders = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const offset = (page - 1) * limit || 0;
    const result = await orderService.getAllOrders(parseInt(limit) || 20, offset);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order Not Found!' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body, req.user);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markItemAsFulfilling = async (req, res) => {
  try {
    const { orderId, itemId, ...details } = req.body;
    const order = await orderService.updateItemStatus(orderId, itemId, 'FULFILLING', details, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markItemAsShipped = async (req, res) => {
  try {
    const { orderId, itemId, ...details } = req.body;
    const order = await orderService.updateItemStatus(orderId, itemId, 'SHIPPED', details, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markItemAsDelivered = async (req, res) => {
  try {
    const { orderId, itemId, ...details } = req.body;
    const order = await orderService.updateItemStatus(orderId, itemId, 'DELIVERED', details, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const order = await orderService.addComment(req.body.orderId, req.body.comment, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const editComment = async (req, res) => {
  try {
    const order = await orderService.editComment(req.body.orderId, req.body.commentIndex, req.body.comment, req.user);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const order = await orderService.deleteComment(req.body.orderId, req.body.commentIndex);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};