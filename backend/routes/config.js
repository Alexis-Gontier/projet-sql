import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation des routes de nos API',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./routes/userRoutes.swagger.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;