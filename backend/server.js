import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectdb from './config/mongodb.js'
import cors from 'cors';
import propertyrouter from './routes/ProductRouter.js';

const app = express();
const port = process.env.PORT || 4000;

connectdb();
app.use(cors());
app.use(express.json());

app.use('/api/products', propertyrouter);


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