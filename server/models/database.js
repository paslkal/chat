import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('chat', 'user', 'password', {
  host: 'db',
  dialect: 'mysql'
});

export default sequelize

try {
  await sequelize.sync()
  console.log('Database synced')

  await sequelize.authenticate();
  console.log('Connection has been established successfully.');  
} catch (error) {
  console.error('Unable to connect to the database or synced it:', error);
}
