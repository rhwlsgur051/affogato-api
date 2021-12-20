'use strict';
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  userSeq: number;
  name: string;
  password: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    userSeq!: number;
    name!: string;
    password!: string;
    email!: string;

    static associate(models: any) {
      // define association here
      User.belongsToMany(models.User, {
        as: 'friends',
        through: 'Friend',
        foreignKey: 'userSeq',
        otherKey: 'otherSeq'
      });
    }
  };
  User.init({
    userSeq: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
      , allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) { // 암호화
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};