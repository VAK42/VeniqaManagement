import * as authService from '../services/authService.js';
export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const user = await authService.createAdmin(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllAdmins = async (req, res) => {
  try {
    const users = await authService.getAllAdmins();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAdminDetails = async (req, res) => {
  try {
    const user = await authService.getAdminDetails(req.query.email);
    if (!user) return res.status(404).json({ error: 'User Not Found!' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateAdminAccess = async (req, res) => {
  try {
    const user = await authService.updateAdminAccess(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    await authService.deleteAdmin(req.body.email);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.query.email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const validatePasswordResetToken = async (req, res) => {
  try {
    const isValid = await authService.validatePasswordResetToken(req.params.token);
    res.status(200).json({ isValid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};