import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';
import bcrypt from 'bcrypt';

class User extends Model {
  getId() {
    return this.id;
  }
} 

export async function createUser({ email, password }) {
  try {
    const salt = await bcrypt.genSalt(); 
    const hashedPassword = await bcrypt.hash(password, salt);
    
    
    const createdUser = await User.create({ email, password: hashedPassword })
    
    console.log('User has been created');
    
    return createdUser.toJSON()
  } catch (error) {
    console.log(error);
  }
}

export async function changePassword({ id, password, newPassword }) {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) throw Error('Didn\'t find a user');

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw Error('Wrong password')

    const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());
    
    const changedUser = await user.update({ password: hashedPassword });
    
    console.log('Password has been updated');
    
    return changedUser.toJSON()
  } catch (error) {
    console.log(error);
  }
}

User.init({
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isLowercase: true
    }   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'User'
});

await User.sync();
console.log('The table for User model has been (re)created');
