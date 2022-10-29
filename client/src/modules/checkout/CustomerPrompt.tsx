import { capitalize } from 'lodash';
import { CFormFloating, CFormLabel, CFormSelect, CModal } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { Customer } from './typing';
import { changeTypeUser } from './checkout.reducer';

const CustomerPrompt = () => {
  const { customerType } = useSelector((state: RootState) => state.checkout);
  const customerTypes = [Customer.DEFAULT, Customer.AMAZON, Customer.FACEBOOK, Customer.MICROSOFT];
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;
    dispatch(changeTypeUser(e.target.value as Customer));
  };

  return (
    <>
      <CModal backdrop="static" visible={Boolean(!customerType)} className={`popverLoading`} >
        <CFormFloating>
          <CFormSelect id="customerType" aria-label="Picking customer type" onChange={handleChange}>
            <option value="">Select customer type</option>
            {customerTypes.map((type) => (
              <option key={type} value={type}>
                {capitalize(type)}
              </option>
            ))}
          </CFormSelect>
          <CFormLabel htmlFor="customerType">Please pick your customer type!</CFormLabel>
        </CFormFloating>
      </CModal>
    </>
  );
};

export default CustomerPrompt;
