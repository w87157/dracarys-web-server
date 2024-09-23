import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IForumContent } from '@/interface';

interface ForumContentModel
  extends Model<InferAttributes<ForumContentModel>, InferCreationAttributes<ForumContentModel>>,
  IForumContent { }
const model = sequelize.define<ForumContentModel>(
  'forum-content-model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Player_id: {
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
    figcaption: {
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
