import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopProduct } from '@/interface';

interface ShopProduct
  extends Model<InferAttributes<ShopProduct>, InferCreationAttributes<ShopProduct>>,
  IShopProduct {}
const model = sequelize.define<ShopProduct>(
  'shop_product_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING(100),
    },
    product_desc: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING(100),
    },
    image: {
      type: DataTypes.STRING(100),
    },
    onshelf_status: {
      type: DataTypes.STRING(100),
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