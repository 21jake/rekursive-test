import { IApplyPoliciesBody, Customer, Size } from '../typings';

export const defaultTestCases: IApplyPoliciesBody[] = [
  {
    customerType: Customer.DEFAULT,
    items: {
      [Size.SMALL]: { purchaseCount: 1 },
      [Size.MEDIUM]: { purchaseCount: 1 },
      [Size.LARGE]: { purchaseCount: 1 },
    },
    expectedTotal: 49.97,
  },
  {
    customerType: Customer.MICROSOFT,
    items: {
      [Size.SMALL]: { purchaseCount: 3 },
      [Size.LARGE]: { purchaseCount: 1 },
    },
    expectedTotal: 45.97,
  },
  {
    customerType: Customer.AMAZON,
    items: {
      [Size.MEDIUM]: { purchaseCount: 3 },
      [Size.LARGE]: { purchaseCount: 1 },
    },
    expectedTotal: 67.96,
  },
];

export const customTestcases: IApplyPoliciesBody[] = [
  {
    customerType: Customer.FACEBOOK,
    items: {
      [Size.SMALL]: { purchaseCount: 2 },
      [Size.MEDIUM]: { purchaseCount: 3 },
      [Size.LARGE]: { purchaseCount: 2 },
    },
    expectedTotal: 115.93,
  },
  {
    customerType: Customer.FACEBOOK,
    items: {
      [Size.SMALL]: { purchaseCount: 2 },
      [Size.MEDIUM]: { purchaseCount: 5 },
      [Size.LARGE]: { purchaseCount: 2 },
    },
    expectedTotal: 131.92,
  },
  {
    customerType: Customer.MICROSOFT,
    items: {
      [Size.SMALL]: { purchaseCount: 2 },
    },
    expectedTotal: 23.98,
  },
  {
    customerType: Customer.MICROSOFT,
    items: {
      [Size.SMALL]: { purchaseCount: 3 },
    },
    expectedTotal: 23.98,
  },
  {
    customerType: Customer.FACEBOOK,
    items: {
      [Size.MEDIUM]: { purchaseCount: 4 },
    },
    expectedTotal: 63.96,
  },
  {
    customerType: Customer.FACEBOOK,
    items: {
      [Size.MEDIUM]: { purchaseCount: 5 },
    },
    expectedTotal: 63.96,
  },
  {
    customerType: Customer.AMAZON,
    items: {
      [Size.LARGE]: { purchaseCount: 100 },
    },
    expectedTotal: 1998.9999999999998,
  },
];

export const invalidCases: IApplyPoliciesBody[] = [
  {
    customerType: Customer.FACEBOOK,
    items: {
      invalidKey: { purchaseCount: 2 },
    },
  },
  {
    customerType: Customer.FACEBOOK,
    items: {
      [Size.LARGE]: { purchaseCount: -1 },
    },
  },
  {
    customerType: Customer.DEFAULT,
    items: {
      [Size.LARGE]: { purchaseCount: 0 },
    },
  },
];
