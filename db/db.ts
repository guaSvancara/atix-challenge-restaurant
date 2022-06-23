import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('challenge', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
