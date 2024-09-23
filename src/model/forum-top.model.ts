import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IForumTop } from '@/interface';

const generateDigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000); // 
};
interface ForumTopModel
  extends Model<InferAttributes<ForumTopModel>, InferCreationAttributes<ForumTopModel>>,
  IForumTop { }
const model = sequelize.define<ForumTopModel>(
  'forum-top-model',
  {
    image: {
      type: DataTypes.STRING(100),
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
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
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
