import express from 'express';
import connectDB from './config/dbConfig.js';

const PORT = process.env.PORT || 3000; 
 
const app = express(); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
