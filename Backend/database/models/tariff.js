import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';
const Tariff = sequelize.define('Tariff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  rates: { type: DataTypes.JSON, allowNull: false }
});
export default Tariff;