'use strict';
import { Model } from 'sequelize';

interface ChatAttributes {
  id: number;
  content: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Chat extends Model<ChatAttributes> implements ChatAttributes {
    id!: number;
    content!: string;
  };
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};