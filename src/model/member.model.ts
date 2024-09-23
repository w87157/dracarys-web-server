import { DataTypes } from "sequelize";
import sequelize from "../config/mysql";
import { initTable } from "../utils";

const Account = sequelize.define(
  "Account",
  {
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastactive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    access_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
    },
    host: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    banned: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      comment: "是否連線服務器",
    },
    character_slot: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    spw: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -256,
    },
    server_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "登入服務器編號",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    google_uid: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    photo_url: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    diamond: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "accounts",
    timestamps: false,
  }
);

initTable(Account);
export default Account;
