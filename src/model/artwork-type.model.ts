import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IArtworkType } from '@/interface';

interface ArtWorkTypeModel
  extends Model<InferAttributes<ArtWorkTypeModel>, InferCreationAttributes<ArtWorkTypeModel>>,
  IArtworkType { }
const model = sequelize.define<ArtWorkTypeModel>(
  'art-work-type-model',
  {
    user_account: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    artwork_id: {
      type: DataTypes.INTEGER,
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
