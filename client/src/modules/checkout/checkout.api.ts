import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios-interceptor';
import { Customer, IResp, TCartItems, TPizzas } from './typing';

export const getEntities = createAsyncThunk(`get-products`, async (_, thunkAPI) => {
  try {
    const { data } = await axios.get<IResp<TPizzas>>(`/products`);
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface IApplyPoliciesBody {
  customerType: Customer;
  items: TCartItems;
}

export const applyPolicies = createAsyncThunk(`apply-policies`, async (body: IApplyPoliciesBody, thunkAPI) => {
  try {
    
    const { data } = await axios.post<IResp<TCartItems>>(`checkout/apply-policies`, body);
    return data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
