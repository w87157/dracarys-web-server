import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IShoppingCart } from '@/interface';
import Account from "@/model/member.model";
import ShopProduct from '@/model/shop-product.model';
import ShoppingCartItems from '@/model/shop-cart-items.model';

interface ShoppingCart
  extends Model<InferAttributes<ShoppingCart>, InferCreationAttributes<ShoppingCart>>,
  IShoppingCart { }
const ShoppingCart = sequelize.define<ShoppingCart>(
  'shopping_cart_model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_player_account: {
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

ShoppingCart.belongsTo(Account, {
  foreignKey: 'fk_player_account',
  targetKey: 'login',
});

ShoppingCart.belongsToMany(ShopProduct, {
  through: {
    model: ShoppingCartItems,
    unique: false,
  },
  foreignKey: 'fk_cart_id',
});

initTable(ShoppingCart);
export default ShoppingCart;