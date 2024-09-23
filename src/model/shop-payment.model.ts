import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShopPayment } from '@/interface';
import ShopMyOrder from '@/model/shop-my-order.model';

interface ShopPayment
  extends Model<InferAttributes<ShopPayment>, InferCreationAttributes<ShopPayment>>,
    IShopPayment {}
const model = sequelize.define<ShopPayment>(
  'shop_payment_model',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      // autoIncrement: true,
    },
    fk_order_id: {
      type: DataTypes.INTEGER,
    },
    payment_method: {
      type: DataTypes.STRING(100),
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
    },
    paid_at: {
      type: DataTypes.DATE,
    },
    coupon_used: {
      type: DataTypes.BOOLEAN,
    },
    fk_coupon_id: {
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

// model.belongsTo(ShopMyOrder, {
//   foreignKey: 'fk_order_id',
//   targetKey: 'id',
// });

initTable(model);
export default model;