import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IForumList } from '@/interface';

const generateDigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000); // 
};
interface ForumListModel
  extends Model<InferAttributes<ForumListModel>, InferCreationAttributes<ForumListModel>>,
  IForumList { }
const model = sequelize.define<ForumListModel>(
  'forum-list-model',
  {
    image: {
      type: DataTypes.STRING(100),
    },
    article_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
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