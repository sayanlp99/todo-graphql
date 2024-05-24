import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

interface UserAttributes {
  userId: number;
  username: string;
  password: string;
  createdOn: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'createdOn'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public userId!: number;
  public username!: string;
  public password!: string;
  public createdOn!: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);
