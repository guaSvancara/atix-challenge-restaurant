import express, {Application} from 'express';
import connection from './db/db';
import sequelize from './db/db';
import pizzaRoutes from './routes/pizza';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.json';
require('./db/asociations');

/** Express server */
class Server {
  private app: Application;
  private port: string;
  private paths = {
    recipes: '/recipes',
    ingredient: '/ingredient',
    pizza: '/',
  };

  /** server constructor */
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  /** database connection */
  async dbConnection() {
    try {
      await connection.authenticate();
      console.log('DB UP');
    } catch (error) {
      throw new Error();
    }
  }

  /** app and swagger routes */
  routes() {
    this.app.use(this.paths.pizza, pizzaRoutes);
    this.app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerJson),
    );
  }

  /** middlewares */
  middlewares() {
    this.app.use(express.json());
  }

  /** run server */
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server UP  port:' + this.port);
      sequelize.sync({force: false}).then(() => {
        console.log('Nos hemos conectado a la db');
      }).catch((error) => {
        console.log('Se ha producido un error', error);
      });
    });
  }
}

export default Server;
