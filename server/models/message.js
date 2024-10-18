import sequelize from "./database.js";
import { DataTypes, Model } from "sequelize";
import User from "./user.js";
import Chat from "./chat.js";

export default class Message extends Model {}

Message.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }, 
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Chats',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Message'
})

// Message.belongsTo(User ,{
//   foreignKey: 'userId',
//   as: 'user'
// })

// Message.belongsTo(Chat, {
//   foreignKey: 'chatId',
//   as: 'chat'
// })

Message.sync()