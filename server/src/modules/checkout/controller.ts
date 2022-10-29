import { Request, Response } from 'express';
import { Customer, Size } from '../../typings';
import { Checkout } from './utils/checkout';

const applyPolicies = async ({ body }: Request, res: Response) => {
  const { customerType = Customer.DEFAULT, items } = body;
  const co = new Checkout(customerType);

  Object.keys(items).forEach((size) => {
    co.add(size as Size, items[size].purchaseCount);
  })

  const { cart, total } = co.total();
  res.status(200).json({ success: true, data: { cart, total } });
};

export { applyPolicies };
