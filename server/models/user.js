import { DataTypes, Model } from 'sequelize';
import sequelize from './database.js';
import bcrypt from 'bcrypt';

class User extends Model {
  getId() {
    return this.id;
  }
} 

async function createUser({ email, password }) {
  try {
    const salt = await bcrypt.genSalt(); 
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword });
  } catch (error) {
    console.log(error);
  }
}

async function changePassword({ id, password, newPassword }) {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) return { Error: 'Didn\'t find a user' };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return { Error: 'Wrong password' };

    const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());
    await user.update({ password: hashedPassword });
    console.log('Password has been updated');
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

// Create user
await createUser({ email: 'paskalsin@gmail.com', password: 'Inferno228' });

console.log('User has been created');

await changePassword({
  id: '18ce1c4e-d46b-49dc-9913-bcfecef4785b', 
  password: 'Inferno228', 
  newPassword: 'Inferno'
})
