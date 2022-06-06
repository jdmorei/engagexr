import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Company } from '@interfaces/companies.interface';

export type CompanyCreationAttributes = Optional<Company, 'id' | 'email' | 'phone' | 'website'>;

export class CompanyModel extends Model<Company, CompanyCreationAttributes> implements Company {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public website: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CompanyModel {
  CompanyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
      },
      phone: {
        type: DataTypes.STRING(255),
      },
      website: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'companies',
      sequelize,
    },
  );

  return CompanyModel;
}
