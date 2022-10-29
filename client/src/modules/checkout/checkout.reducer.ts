import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEntities, applyPolicies } from './checkout.api';
import { Customer, TCartItems, TPizzas } from './typing';

interface ItemsWithAppliedPolicies {
  cart: TCartItems;
  total: number;
}

interface ICheckoutState {
  products: TPizzas | undefined;
  customerType: Customer | undefined;
  loading: boolean;
  errorMessage: string;
  cartItems: ItemsWithAppliedPolicies | undefined;
}

const initialState: ICheckoutState = {
  customerType: undefined,
  products: undefined,
  loading: false,
  errorMessage: '',
  cartItems: undefined,
};

const { actions, reducer } = createSlice({
  name: 'checkoutSlice',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    changeTypeUser: (state, { payload }: PayloadAction<Customer>) => {
      state.customerType = payload;
    },
  },

  extraReducers: {
    [getEntities.fulfilled.type]: (state, { payload }: PayloadAction<TPizzas>) => {
      state.products = payload;
      state.loading = false;
    },
    [getEntities.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.errorMessage = payload?.message;
      state.loading = false;
    },
    [applyPolicies.fulfilled.type]: (state, { payload }: PayloadAction<ItemsWithAppliedPolicies>) => {
      state.cartItems = payload;
      state.loading = false;
    },
    [applyPolicies.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.errorMessage = payload?.message;
      state.loading = false;
    },
  },
});

export const { fetching, changeTypeUser } = actions;

export default reducer;
