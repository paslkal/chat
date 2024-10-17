import { Sequelize } from 'sequelize'

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('chat', 'user', 'password', {
  host: 'db',
  dialect: 'mysql'
});

export default sequelize

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}