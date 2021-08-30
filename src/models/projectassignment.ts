'use strict';
import { Model } from 'sequelize';

interface ProjectAssignmentsAttributes {
  ProjectId: number;
  userId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProjectAssignment extends Model<ProjectAssignmentsAttributes> {

    ProjectId!: number;
    userId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };

  ProjectAssignment.init({
    ProjectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
  },
    {
      sequelize,
      modelName: 'ProjectAssignment',
    });
  return ProjectAssignment;
};