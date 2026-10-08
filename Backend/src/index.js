import express from 'express';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRouts.js';
import deviceRoutes from './routes/deviceRoutes.js';

const PORT = process.env.PORT || 3000; 
 
const app = express(); 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/devices", deviceRoutes);

await connectDB();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
