import express from 'express';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRouts.js';

const PORT = process.env.PORT || 3000; 
 
const app = express(); 

app.use(express.json());

app.use('/api/auth', authRoutes);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
