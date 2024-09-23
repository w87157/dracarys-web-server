import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IForum } from '@/interface';

const generateDigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000); // 
};
interface ForumModel
  extends Model<InferAttributes<ForumModel>, InferCreationAttributes<ForumModel>>,
  IForum { }
const model = sequelize.define<ForumModel>(
  'forum-model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, //must have
      autoIncrement: true,
    },
    Player_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(30),
      allowNull: false,  //must have
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: false, //must have
    },
    article_title: {
      type: DataTypes.STRING(100),
      allowNull: false, //must have
    },
    article: {
      type: DataTypes.STRING(300),
      allowNull: false, //must have
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    figcaption: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    submit_time: {
      type: DataTypes.DATE,
      allowNull: true,
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