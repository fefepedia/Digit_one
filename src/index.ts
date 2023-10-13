import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import inventoryRoutes from './routes/inventoryRoutes';
import superInventoryRoutes from './routes/superInventoryRoutes';
import authRoute from './routes/authRoute';
import authDashboard from './routes/admin/authDashboard';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import companyRoutes from './routes/companyRoutes';
// Import your 'verify' middleware
import verify from './middlewares/authVerify'; // Modify the path to your actual middleware location

const app = express();

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

// Apply the 'verify' middleware globally
//app.use(verify);

app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  })
);

dotenv.config();

mongoose
  .connect(
    process.env.DB_CONNECTION as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any
  )
  .then(() => console.log('connected to db'))
  .catch((error) => console.error('DB Connection Error:', error));

app.use('/api/inventory', inventoryRoutes);
app.use('/api/super-inventory', superInventoryRoutes);
app.use('/api/users', authRoute);
app.use('/api/dashboard', authDashboard);
app.use('/api/company', companyRoutes);

// Serve Swagger documentation using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
