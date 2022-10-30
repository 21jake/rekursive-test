import { Request, Response } from 'express';
import { Customer, Size } from '../../typings';
import { Checkout } from './utils/checkout';

const applyPolicies = async ({ body }: Request, res: Response) => {
  const { customerType = Customer.DEFAULT, items } = body;
  const co = new Checkout(customerType);

  Object.keys(items).forEach((size) => {
    if (!(size in Size)) {
      res.status(400).json({ success: false, err: 'Invalid size' });
    }

    const purchaseCount = items[size].purchaseCount;
    if (purchaseCount < 0) {
      res.status(400).json({ success: false, err: 'Invalid purchase count' });
    }
    co.add(size as Size, purchaseCount);
  });

  const { cart, total } = co.total();
  res.status(200).json({ success: true, data: { cart, total } });
};

export { applyPolicies };
