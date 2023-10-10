import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import inventoryRoutes from './routes/inventoryRoutes';
import superInventoryRoutes from './routes/superInventoryRoutes';
import authRoute from './routes/authRoute';
import authDashboard from './routes/authDashboard';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'   ;

const app = express();

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

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
    optionsSuccessStatus: 204,
  })
);


dotenv.config();
console.log(process.env.TOKEN_SECRET);

mongoose.connect('mongodb://127.0.0.1:27017/digit-one?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any).then(() => console.log("connected to db"))
  .catch((error) => console.error("DB Connection Error:", error));;


app.use('/api/inventory', inventoryRoutes);
app.use('/api/super-inventory', superInventoryRoutes);
app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
