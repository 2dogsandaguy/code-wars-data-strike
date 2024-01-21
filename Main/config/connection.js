/* const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME_RENDER,
    process.env.DB_USER_RENDER,
    process.env.DB_PASSWORD_RENDER,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
  console.log('Connecting to the database:', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    username: process.env.DB_USER_RENDER,
    database: process.env.DB_NAME_RENDER,
  });
}
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});


module.exports = sequelize;
 */
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME_RENDER,
    process.env.DB_USER_RENDER,
    process.env.DB_PASSWORD_RENDER,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
  console.log('Connecting to the database:', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    username: process.env.DB_USER_RENDER,
    database: process.env.DB_NAME_RENDER,
  });
}

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
