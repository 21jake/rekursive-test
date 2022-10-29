export enum Size {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
  }
  
  export type TPizzas = { [key in Size]: { description: string; price: number, size: string } };
  
  export type TCartItems = { [key in Size]: { purchaseCount: number; total?: number } };
  
  export enum Customer {
    DEFAULT = 'DEFAULT',
    MICROSOFT = 'MICROSOFT',
    AMAZON = 'AMAZON',
    FACEBOOK = 'FACEBOOK',
  }

  export interface IResp<T> {
    success: boolean;
    data: T;
  }