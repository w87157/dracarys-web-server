import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';
import { IArtwork } from '@/interface';

interface ArtWorkModel
  extends Model<InferAttributes<ArtWorkModel>, InferCreationAttributes<ArtWorkModel>>,
  IArtwork { }
const model = sequelize.define<ArtWorkModel>(
  'art-work-model',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      // 必填
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING(100),
      // 必填
      allowNull: false,
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    download_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    artwork_type_id: {
      type: DataTypes.INTEGER,
      // 必填
      allowNull: false,
      defaultValue: 1,
    },
    user_account: {
      type: DataTypes.STRING(50),
      // 必填
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // deletedAt: 'deleted_at',
    timestamps: false,
  }
);


initTable(model);
export default model;
