'use strict';
import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: number;
    name!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: 'ProjectAssignments'
      })
    }
  };
  User.init({
    id: {
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
      set(value:string) { // 암호화
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