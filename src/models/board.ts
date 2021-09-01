'use strict';
import { Model } from 'sequelize';

interface BoardAttributes {
  id: number;
  title: string;
  content: string;
  isDeleted: boolean;
  userSeq: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Board extends Model<BoardAttributes> implements BoardAttributes {
    id!: number;
    title!: string;
    content!: string;
    userSeq!: number;
    isDeleted!: boolean;
  };
  Board.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userSeq: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};