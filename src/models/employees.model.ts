import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Employee } from '@interfaces/employees.interface';
import { CompanyModel } from './companies.model';

export type EmployeeCreationAttributes = Optional<Employee, 'id' | 'email' | 'phone'>;

export class EmployeeModel extends Model<Employee, EmployeeCreationAttributes> implements Employee {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public companyId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EmployeeModel {
  EmployeeModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      lastName: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
      },
      phone: {
        type: DataTypes.STRING(255),
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'employees',
      sequelize,
    },
  );

  EmployeeModel.belongsTo(CompanyModel, { foreignKey: 'companyId' });

  return EmployeeModel;
}
