import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'RECEIVED' },
  items: { type: DataTypes.JSON, allowNull: false },
  shippingAddress: { type: DataTypes.JSON },
  paymentInfo: { type: DataTypes.JSON },
  auditLog: { type: DataTypes.JSON }
});
export default Order;