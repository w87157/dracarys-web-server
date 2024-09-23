import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShoppingCartItems } from '@/interface';

interface ShoppingCartItems
  extends Model<InferAttributes<ShoppingCartItems>, InferCreationAttributes<ShoppingCartItems>>,
  IShoppingCartItems {}
const model = sequelize.define<ShoppingCartItems>(
  'shopping_cart_items_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

initTable(model);
export default model;