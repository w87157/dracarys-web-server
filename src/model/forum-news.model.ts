import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IForumNews } from '@/interface';

const generateDigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000); // 
};
interface ForumNewsModel
  extends Model<InferAttributes<ForumNewsModel>, InferCreationAttributes<ForumNewsModel>>,
  IForumNews { }
const model = sequelize.define<ForumNewsModel>(
  'forum-news-model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    article_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    article: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    image: {
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
