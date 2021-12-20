'use strict';
import { Model } from 'sequelize';

interface BoardAttributes {
  boardSeq: number;
  title: string;
  content: string;
  isDeleted: Boolean;
  userSeq: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Board extends Model<BoardAttributes> implements BoardAttributes {
    boardSeq!: number;
    title!: string;
    content!: string;
    userSeq!: number;
    isDeleted!: Boolean;
  };
  Board.init({
    boardSeq: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
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