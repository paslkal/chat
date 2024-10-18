import { Model, DataTypes } from 'sequelize';
import sequelize from './database.js';
import User from './user.js';
import Message from './message.js';

export default class Chat extends Model {}

Chat.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false
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
  modelName: 'Chat',
});

// Chat.hasMany(Message, {
//   foreignKey: 'chatId',
//   as: 'messages'
// })

// Chat.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user'
// });

Chat.sync()

async function createMessage({message, userId}) {
  Chat.create({message, userId})
}

export async function getChats(id) {
  return await Chat.findAll({where: {id}})
}