import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/mysql';
import { initTable } from '../utils';

export class comment extends Model {
  public id!: number;
  public product_name!: string;
  public product_desc!: string;
  public price!: number;
  public category!: string;
  public image!: string;
  public onshelf_status!: string;
}

comment.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // references: {
      //   model: 'player_character',
      //   key: 'id',
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
    artwork_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'artwork',
      //   key: 'id',
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'comment',
    timestamps: true,
  }
);


initTable(comment);