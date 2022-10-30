import { cilCart, cilMinus, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCarousel,
  CCarouselItem,
  CCol,
  CContainer,
  CImage,
  CRow,
  CSmartTable,
} from '@coreui/react-pro';
import autoAnimate from '@formkit/auto-animate';
import { Formik } from 'formik';
import { capitalize } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pizzaImg from '../../assets/img/pizza.jpg';
import pizzaImg2 from '../../assets/img/pizza2.jpg';
import pizzaImg3 from '../../assets/img/pizza3.jpg';
import pizzaImg4 from '../../assets/img/pizza4.png';
import { RootState } from '../../reducers';
import { applyPolicies, getEntities } from './checkout.api';
import { fetching } from './checkout.reducer';
import ConfirmationDialog from './ConfirmationDialog';
import CustomerPrompt from './CustomerPrompt';
import { Customer, Size, TCartItems, TPizzas } from './typing';

const columns = [
  {
    key: 'size',
    _style: { width: '5%' },
    sorter: false,
    // _props: { color: 'primary', className: 'fw-semibold' },
  },

  // { key: 'description', _style: { width: '40%' }, sorter: false },
  { key: 'price', _style: { width: '10%' } },
  { key: 'amount', _style: { width: '5%' } },
  { key: 'total', _style: { width: '10%' } },
  { key: 'remove', _style: { width: '10%' }, sorter: false, filter: false },
];
interface ICartData {
  size: Size | undefined;
  description: string | undefined;
  price: number | undefined;
  amount: number;
  total: number;
  _cellProps?: Object;
}

interface IInitalFormValues {
  chosenSize: Size;
  amount: number;
  cartItems: TCartItems;
}
const initialFormValues: IInitalFormValues = {
  chosenSize: Size.MEDIUM,
  amount: 0,
  cartItems: {
    [Size.SMALL]: {
      purchaseCount: 0,
    },
    [Size.MEDIUM]: {
      purchaseCount: 0,
    },
    [Size.LARGE]: {
      purchaseCount: 0,
    },
  },
};

const convertCartItemsToCartTableData = (items: TCartItems, products: TPizzas | undefined): ICartData[] => {
  if (!products) return [];
  const cartData: ICartData[] = Object.entries(items)
    .map(([key, value]) => {
      const { description, price } = products[key as Size];
      return {
        size: key as Size,
        description,
        price: price,
        amount: value.purchaseCount,
        total: value.purchaseCount * price,
      };
    })
    .filter((e) => e.amount > 0);

  if (!cartData.length) return [];

  const totalAmount = cartData.reduce((acc, item) => acc + item.amount, 0);
  const totalPrice = cartData.reduce((acc, item) => acc + item.total, 0);

  cartData.push({
    size: undefined,
    description: undefined,
    price: undefined,
    amount: totalAmount,
    total: totalPrice,
    _cellProps: {
      total: { className: 'text-info fw-bold' },
      amount: { className: 'text-info fw-bold' },
      size: { className: 'text-info fw-bold' },
    },
  });

  return cartData;
};

const Checkout = () => {
  const {
    products,
    loading,
    customerType,
    cartItems: itemsWithAppliedPolices,
  } = useSelector((state: RootState) => state.checkout);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetching products from server
    dispatch(fetching());
    dispatch(getEntities());

    // Apply some basic animations
    const tableBody = document.querySelectorAll('tbody');
    tableBody.forEach((node) => {
      autoAnimate(node);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer className={`py-5`}>
      <CustomerPrompt />
      <ConfirmationDialog visible={orderPlaced} />

      <CRow>
        <CCol xs={12} className={`d-flex justify-content-between`}>
          <p className={`lead`}>
            Hello <span className="text-primary">{capitalize(customerType || 'User')}</span> 🍕
          </p>
        </CCol>

        <Formik
          initialValues={initialFormValues}
          onSubmit={(values) => {
            dispatch(fetching());
            const body = {
              customerType: customerType || Customer.DEFAULT,
              items: values.cartItems,
            };
            dispatch(applyPolicies(body));
          }}
        >
          {({ values, setFieldValue, submitForm }) => (
            <>
              <CCol xs={12} lg={6}>
                <CCard>
                  <CCardHeader>
                    <p className={`m-0 text-lead`}>Your delicious pizzas are few clicks away!</p>
                  </CCardHeader>
                  <CCardBody>
                    <CCarousel controls>
                      <CCarouselItem>
                        <CImage rounded thumbnail={true} className="d-block w-100" src={pizzaImg} alt="slide 1" />
                      </CCarouselItem>
                      <CCarouselItem>
                        <CImage rounded thumbnail={true} className="d-block w-100" src={pizzaImg2} alt="slide 2" />
                      </CCarouselItem>
                      <CCarouselItem>
                        <CImage rounded thumbnail={true} className="d-block w-100" src={pizzaImg3} alt="slide 3" />
                      </CCarouselItem>
                    </CCarousel>
                    <CRow className={`mt-3 justify-content-between px-3`}>
                      {products
                        ? Object.keys(products).map((key, i) => {
                            const product = products[key as Size];
                            return (
                              <CCol
                                xs={4}
                                sm={3}
                                className={`border rounded text-center p-1  border-${
                                  values.chosenSize === key ? 'success' : 'secondary'
                                }`}
                                onClick={() => {
                                  setFieldValue('chosenSize', key);
                                  setFieldValue('amount', 0);
                                }}
                                key={`k-${i}`}
                              >
                                <p className={`small text-secondary`}>{`${capitalize(key)} ${product.size}`}</p>
                                <p className={`fw-bold m-0 `}>{`$${product.price}`}</p>
                              </CCol>
                            );
                          })
                        : ''}
                    </CRow>
                    <CRow className={`mt-3 px-3`}>
                      <CCol xs={12} sm={6}>
                        <span className={`text-lead text-info`}>
                          {products?.[values.chosenSize].description || ''}
                        </span>
                      </CCol>
                      <CCol xs={12} sm={6} className={`d-flex justify-content-end mt-2 ${Boolean(itemsWithAppliedPolices) && 'd-none'}`}>
                        <CButton
                          size="sm"
                          variant="outline"
                          color="danger"
                          onClick={() => setFieldValue('amount', values.amount >= 1 ? values.amount - 1 : 0)}
                        >
                          <CIcon icon={cilMinus} />
                        </CButton>
                        <span className={`mx-2`}>{values.amount}</span>
                        <CButton
                          size="sm"
                          variant="outline"
                          color="success"
                          onClick={() => setFieldValue('amount', values.amount + 1)}
                        >
                          <CIcon icon={cilPlus} />
                        </CButton>

                        <CButton
                          size="sm"
                          color="success"
                          className={`float-end text-white ms-3`}
                          disabled={Boolean(!values.amount)}
                          onClick={() => {
                            const { cartItems } = values;
                            const { chosenSize, amount } = values;
                            const { purchaseCount } = cartItems[chosenSize];
                            setFieldValue('cartItems', {
                              ...cartItems,
                              [chosenSize]: { purchaseCount: purchaseCount + amount },
                            });
                            setFieldValue('amount', 0);
                          }}
                        >
                          ADD
                          <CIcon icon={cilCart} className={`ms-2`} />
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              {(function () {
                const cartData = convertCartItemsToCartTableData(values.cartItems, products);
                const originalPrice = cartData.filter((e) => e.size).reduce((acc, item) => acc + item.total, 0);
                return (
                  <CCol xs={12} lg={6}>
                    <CSmartTable
                    
                      
                      clickableRows
                      columns={columns}
                      columnFilter
                      columnSorter
                      noItemsLabel={
                        <CRow>
                          <CCol xs={12} className={`d-flex justify-content-center`}>
                            <CImage src={pizzaImg4} height={100} className={`constant-tilt-shake`} />
                          </CCol>
                          <CCol xs={12} className={`d-flex justify-content-center`}>
                            <p className={`lead mt-3`}>No items has been added to the cart yet.</p>
                          </CCol>
                        </CRow>
                      }
                      items={cartData}
                      scopedColumns={{
                        remove: ({ size }: ICartData) => (
                          <td className="text-center">
                            {size && !Boolean(itemsWithAppliedPolices) ? (
                              <CIcon
                                icon={cilTrash}
                                className="text-danger cursor-pointer"
                                onClick={() => {
                                  const { cartItems } = values;
                                  setFieldValue('cartItems', { ...cartItems, [size]: { purchaseCount: 0 } });
                                }}
                              />
                            ) : (
                              ''
                            )}
                          </td>
                        ),
                        size: ({ size }: ICartData) => (
                          <td>{size ? capitalize(size) : <span className={'text-info fw-bold'}>Total</span>}</td>
                        ),
                        price: ({ price }: ICartData) => <td>{price ? `$${price.toFixed(2)}` : ''}</td>,
                        total: ({ total, size }: ICartData) => (
                          <td className={`${!size ? 'text-info fw-bold' : ''}`}>
                            {total ? `$${total.toFixed(2)}` : ''}
                          </td>
                        ),
                        description: ({ description }: ICartData) => <td>{description || ''}</td>,
                      }}
                      sorterValue={{ column: 'name', state: 'asc' }}
                      tableProps={{
                        hover: true,
                        responsive: true,
                      }}
                    />

                    {cartData.length ? (
                      <CRow>
                        <CCol xs={7} className="ms-auto">
                          {itemsWithAppliedPolices?.total ? (
                            <>
                              {originalPrice > itemsWithAppliedPolices.total ? (
                                <p>
                                  {`Discounted price: `}
                                  <del className={`text-secondary`}>{`$${originalPrice.toFixed(2)}`}</del>
                                  <span className={`text-success`}>{` $${itemsWithAppliedPolices.total.toFixed(2)}`}</span>
                                </p>
                              ) : (
                                ''
                              )}
                              <CButton className={`w-100`} onClick={() => setOrderPlaced(true)}>
                                Pay
                                <span className={`text-lead fw-bold`}>{` $${itemsWithAppliedPolices.total.toFixed(2)}`}</span>
                              </CButton>{' '}
                            </>
                          ) : (
                            <CButton className={`w-100`} disabled={loading} onClick={submitForm}>
                              <span>Proceed to checkout</span>
                            </CButton>
                          )}
                        </CCol>
                      </CRow>
                    ) : (
                      ''
                    )}
                  </CCol>
                );
              })()}
            </>
          )}
        </Formik>
      </CRow>
    </CContainer>
  );
};

export default React.memo(Checkout);
