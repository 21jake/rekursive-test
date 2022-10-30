import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import productRouter from './modules/products/router';
import checkoutRouter from './modules/checkout/router';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "*" 
}))



app.get('/', (req: Request, res: Response) => {
  res.send('IT WORKS!');
});


const prefix = `/api`;

app.use(`${prefix}/products`, productRouter);
app.use(`${prefix}/checkout`, checkoutRouter);

// UNHANDLED ROUTES
app.all(`*`, (req, res, next) => {
  const err = `Can not find ${req.originalUrl}`;
  res.status(404).json({ success: false, err });
  // next({err, status: 404});
});

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default server