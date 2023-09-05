import express from 'express';
import mongoose from 'mongoose';
import inventoryRoutes from './routes/inventoryRoutes';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/digit_one', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any); // am avut o eraore aici asa ca am incercat sa trect peste ea print-un "as any"

app.use('/api', inventoryRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
