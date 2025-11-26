import bcryptjs from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import { User } from '../database/models/index.js';
export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User Not Found!');
  if (!user.isActive) throw new Error('Account Not Approved!');
  const isValid = bcryptjs.compareSync(password, user.password);
  if (!isValid) throw new Error('Invalid Password!');
  return { email: user.email, name: user.name, permissions: user.permissions };
};
export const createAdmin = async (data) => {
  const hashedPassword = bcryptjs.hashSync(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
};
export const getAllAdmins = async () => await User.findAll({ attributes: { exclude: ['password'] } });
export const getAdminDetails = async (email) => await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
export const updateAdminAccess = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) throw new Error('User Not Found!');
  return await user.update(data);
};
export const deleteAdmin = async (email) => await User.destroy({ where: { email } });
export const forgotPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User Not Found!');
  const token = randomBytes(20).toString('hex');
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000;
  await user.save();
  console.log(`[Email Service]: Password Reset Link: http://localhost:3000/reset/${token}`);
  return { message: 'Reset Email Sent!' };
};
export const validatePasswordResetToken = async (token) => {
  const user = await User.findOne({ where: { passwordResetToken: token, passwordResetExpires: { [Op.gt]: Date.now() } } });
  return !!user;
};
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ where: { passwordResetToken: token, passwordResetExpires: { [Op.gt]: Date.now() } } });
  if (!user) throw new Error('Invalid Or Expired Token!');
  user.password = bcryptjs.hashSync(newPassword, 10);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();
  return { message: 'Password Reset Successful!' };
};