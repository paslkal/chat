import { Model, DataTypes } from 'sequelize';
import User from './user.js';

class Chat extends Model {}

Chat.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
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

User.hasMany(Chat, {
  foreignKey: 'userId',
  as: 'chats'
});

Chat.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

await Chat.sync();

console.log('The table for Chat model has been (re)created');