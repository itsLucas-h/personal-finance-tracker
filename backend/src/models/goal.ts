import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./user";

interface GoalAttributes {
  id: number;
  userId: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
}

interface GoalCreationAttributes
  extends Optional<GoalAttributes, "id" | "currentAmount" | "deadline"> {}

export class Goal
  extends Model<GoalAttributes, GoalCreationAttributes>
  implements GoalAttributes
{
  public id!: number;
  public userId!: number;
  public title!: string;
  public targetAmount!: number;
  public currentAmount!: number;
  public deadline?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Goal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Goal",
    tableName: "goals",
  }
);

Goal.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Goal, { foreignKey: "userId", as: "goals" });
