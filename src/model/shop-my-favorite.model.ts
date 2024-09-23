import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopMyFavorite } from '@/interface';

interface ShopMyFavorite
  extends Model<InferAttributes<ShopMyFavorite>, InferCreationAttributes<ShopMyFavorite>>,
  IShopMyFavorite {}
const model = sequelize.define<ShopMyFavorite>(
  'shop_my_favorite_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fk_player_account: {
      type: DataTypes.STRING(100),
    },
    fk_product_id: {
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