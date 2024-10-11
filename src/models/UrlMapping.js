"use strict";
import { Model } from "sequelize";
const UrlMapping = (sequelize, DataTypes) => {
  class UrlMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UrlMapping.init(
    {
      orgUrl: DataTypes.STRING,
      shortenUrl: DataTypes.STRING,
      urlPassword: DataTypes.STRING,
      expired_date: DataTypes.DATE,
      IS_VALID: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UrlMapping",
    }
  );
  return UrlMapping;
};
export default UrlMapping;
