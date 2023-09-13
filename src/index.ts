import express from 'express';
import mongoose from 'mongoose';
import inventoryRoutes from './routes/inventoryRoutes';
import superInventoryRoutes from './routes/superInventoryRoutes'; // Import SuperInventory routes

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/digit-one?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as any); // You mentioned there was an error here, which you bypassed with 'as any'.

app.use('/api/inventory', inventoryRoutes);         
app.use('/api/super-inventory', superInventoryRoutes); 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
