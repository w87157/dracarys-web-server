import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopItems } from '@/interface';
import ShopProduct from '@/model/shop-product.model';

interface ShopItems
  extends Model<InferAttributes<ShopItems>, InferCreationAttributes<ShopItems>>,
  IShopItems {}
const model = sequelize.define<ShopItems>(
  'shop_items_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    item_name: {
      type: DataTypes.STRING(100),
    },
    item_desc: {
      type: DataTypes.STRING(100),
    },
    image: {
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

// model.belongsTo(ShopProduct, {
//   foreignKey: 'fk_product_id',
//   targetKey: 'id',
// });

initTable(model);
export default model;