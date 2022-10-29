import { Request, Response } from 'express';
import { pizzas } from '../../data';

const getEntities = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { ...pizzas } });
};

export { getEntities };
