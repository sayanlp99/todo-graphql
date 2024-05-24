import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

interface TodoAttributes {
  todoId: number;
  title: string;
  description: string;
  createdOn: Date;
  userId: number;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'todoId' | 'createdOn'> {}

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
  public todoId!: number;
  public title!: string;
  public description!: string;
  public createdOn!: Date;
  public userId!: number;
}

Todo.init(
  {
    todoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      },
    },
  },
  {
    sequelize,
    tableName: 'todos',
    timestamps: false,
  }
);
