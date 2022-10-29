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
  CSmartTable
} from '@coreui/react-pro';
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
import { Customer, Size, TCartItems } from './typing';

const columns = [
  {
    key: 'size',
    _style: { width: '5%' },
    sorter: false,
    // _props: { color: 'primary', className: 'fw-semibold' },
  },

  { key: 'description', _style: { width: '40%' }, sorter: false },
  { key: 'price', _style: { width: '10%' } },
  { key: 'amount', _style: { width: '5%' } },
  { key: 'total', _style: { width: '10%' } },
  { key: 'action', _style: { width: '10%' }, sorter: false, filter: false },
];
const cartData = [
  { id: 0, size: 'Small', description: '10" pizza for one person', price: '$11.99', amount: '2', total: '$20.99' },
  { id: 1, size: 'Medium', description: '12" pizza for one person', price: '$11.99', amount: '2', total: '$420.99' },
  { id: 2, size: 'Large', description: '10" pizza for one person', price: '$11.99', amount: '3', total: '$201.99' },
  {
    id: 3,
    size: 'Total',
    description: '',
    price: '',
    amount: '7',
    total: '$1201.99',

    _cellProps: {
      total: { className: 'text-info fw-bold' },
      amount: { className: 'text-info fw-bold' },
      size: { className: 'text-info fw-bold' },
    },
  },
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

const Checkout = () => {
  const {
    products,
    loading,
    customerType,
    cartItems: itemsWithAppliedPolices,
  } = useSelector((state: RootState) => state.checkout);

  const [orderPlaced, setOrderPlaced] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetching());
    dispatch(getEntities());
  }, []);

  const convertCartItemsToCartTableData = (items: TCartItems): ICartData[] => {
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

  useEffect(() => {
    console.log(itemsWithAppliedPolices, 'itemsWithAppliedPolices');
  }, [itemsWithAppliedPolices, 'itemsWithAppliedPolices']);

  return (
    <CContainer className={`border border-danger py-5`}>
      <CustomerPrompt />
      <ConfirmationDialog visible={orderPlaced} />
      <CRow>
        <CCol xs={12} className={`d-flex justify-content-between`}>
          <p className={`lead`}>
            Hello <span className="text-primary">{capitalize(customerType || "User")}</span> 🍕
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
              <CCol xs={5}>
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
                    <CRow className={`mt-3 justify-content-center`}>
                      {products
                        ? Object.keys(products).map((key, i) => {
                            const product = products[key as Size];
                            return (
                              <CCol
                                xs={3}
                                className={`border rounded text-center p-1 mx-3 border-${
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
                    <CRow className={`mt-3 px-2 align-items-center justify-content-center`}>
                      <CCol xs={6}>
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
                      </CCol>
                      <CCol xs={6}>
                        <CButton
                          size="sm"
                          color="primary"
                          className={`float-end`}
                          disabled={Boolean(!values.amount) || Boolean(itemsWithAppliedPolices)}
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
                const cartData = convertCartItemsToCartTableData(values.cartItems);
                const originalPrice = cartData.filter((e) => e.size).reduce((acc, item) => acc + item.total, 0);
                return (
                  <CCol xs={7}>
                    <CSmartTable
                      clickableRows
                      columns={columns}
                      columnFilter
                      columnSorter
                      noItemsLabel={
                        <CRow>
                          <CCol xs={12} className={`d-flex justify-content-center`}>
                            <CImage src={pizzaImg4} height={100} />
                          </CCol>
                          <CCol xs={12} className={`d-flex justify-content-center`}>
                            <p className={`lead mt-3`}>No items has been added to the cart yet.</p>
                          </CCol>
                        </CRow>
                      }
                      items={cartData}
                      scopedColumns={{
                        action: ({ size }: ICartData) => (
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
                        total: ({ total }: ICartData) => <td>{total ? `$${total.toFixed(2)}` : ''}</td>,
                        description: ({ description }: ICartData) => <td>{description || ''}</td>,
                      }}
                      sorterValue={{ column: 'name', state: 'asc' }}
                      tableProps={{
                        hover: true,
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
                                  <span>{` $${itemsWithAppliedPolices.total.toFixed(2)}`}</span>
                                </p>
                              ) : (
                                ''
                              )}
                              <CButton className={`w-100`} onClick={() => setOrderPlaced(true)}>
                                Pay
                                <span className={`text-lead`}>{` $${itemsWithAppliedPolices.total.toFixed(2)}`}</span>
                              </CButton>{' '}
                            </>
                          ) : (
                            <CButton className={`w-100`} disabled={loading} onClick={(submitForm)}>
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
