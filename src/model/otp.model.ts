import { DataTypes } from "sequelize";
import sequelize from "../config/mysql";
import { initTable } from "../utils";

const OTP = sequelize.define(
  "OTP",
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "otps",
    timestamps: false,
  }
);

initTable(OTP);
export default OTP;
