import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
const app = express();
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import hijabStyles from './data/hijabStyles.js'
import reviewRouter from './routes/reviewRoute.js';

dbConnection()

//middleware
app.use(express.json())
app.use(cors())


app.use('/api/auth', authRoutes)
app.use('/api/review', reviewRouter)

// all hibjab 
app.get('/api/hijab-styles', (req, res) => {
  res.json(hijabStyles);
});

app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(process.env.PORT, console.log(`server is running on port ${process.env.PORT} `));
