import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import inventoryRoutes from './routes/inventoryRoutes';
import superInventoryRoutes from './routes/superInventoryRoutes';

// Assuming these paths are correct for your auth routes:
import authRoute from './routes/authRoute';
import authDashboard from './routes/authDashboard';

const app = express();

// Middleware
app.use(bodyParser.json()); // Replaces the express.json() middleware for body parsing
app.use(cors());

// Environment variables setup
dotenv.config();
console.log(process.env.TOKEN_SECRET);
// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/digit-one?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any).then(() => console.log("connected to db"))
.catch((error) => console.error("DB Connection Error:", error));;



// Routes
app.get("/", (req: Request, res: Response) => {
    res.send(`Hey it's working !!`);
});
app.use('/api', inventoryRoutes);         
app.use('/api', superInventoryRoutes);
app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);

// Server start
const PORT: string | number = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
