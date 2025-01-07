import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectdb from './config/mongodb.js';
import cors from 'cors';
import propertyrouter from './routes/ProductRouter.js';
import userrouter from './routes/UserRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectdb();

app.use(express.json());

const allowedOrigins = ['http://localhost:4000', 'http://localhost:5174', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/api/products', propertyrouter);
app.use('/api/users', userrouter);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Status</title>
      </head>
      <body>
        <h1>API is working</h1>
        <p>Welcome to the API. Everything is running smoothly.</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});