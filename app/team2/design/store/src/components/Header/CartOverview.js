import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../../redux/selectors';
import cartSlice from './cartSlice';
import noticeSlice from '../../redux/noticeSlice';
import normalizeNumber from '../../logic/normalizeNumber';
import cartApi from '../../api/cartApi';
const CartContainer = styled.div`
  width: 8rem;
  background-color: white;
  position: fixed;
  top: 0;
  border-top: 1px solid var(--text-primary);
  border-left: 1px solid var(--text-primary);
  right: 0;
  height: 100vh;
  max-height: 100vh;
  z-index: 1000;
`;
const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  ::before {
    content: '';
    position: absolute;
    display: block;
    width: 0px;
    left: 5px;
    top: 44px;
    border: 15px solid transparent;
    border-left: 0;
    border-right: 15px solid var(--text-primary);
    transform: translate(calc(-100% - 5px), -50%);
  }
`;
const CartHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CartBody = styled.div`
  flex: 1;
  padding: 12px;
  padding-top: 0;
  overflow: auto;
  height: calc(100vh - 111.5px);
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
    border-radius: 0.75rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--text-primary);
  }
`;
const SubTotal = styled.div`
  font-size: 12px;
  font-weight: 600;
`;
const SubTotalNumber = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--bg-primary);
`;
const ContainerFlex = styled.div`
  flex-direction: column;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const ContainerRow = styled(ContainerFlex)`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const CartItemContainer = styled.div`
  margin-bottom: 1rem;
`;
const SelectBox = styled.select`
  font-size: 13px;
  outline: 1px solid var(--bg-primary);
  border-radius: 0.75rem;
  width: 48px;
  * {
    font-size: 13px;
  }
`;
const Input = styled.input`
  display: block;
  font-size: 13px;
  border: none;
  outline: 1px solid var(--text-primary);
  border-radius: 0.75rem;
  display: inline-block;
  width: 36px;
  padding: 2px 6px;
  :focus {
    outline: 1px solid var(--bg-primary);
  }
`;
function ItemControl({ item }) {
  const [openInput, setOpenInput] = useState(item.quantity > 10);
  const [inputQuantity, setInputQuantity] = useState(item.quantity);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const deleteItem = () => {
    cartApi
      .deleteItem({
        cartId: cart.current.id,
        cartBookItemId: item.id,
      })
      .then((cart) => {
        dispatch(cartSlice.actions.setSuccess(cart));
        dispatch(
          noticeSlice.actions.show({
            title: 'Xoá sản phẩm thành công',
            type: 'success',
          })
        );
      })
      .catch(() => {
        dispatch(
          noticeSlice.actions.show({
            title: 'Xoá sản phẩm không thành công',
            type: 'error',
          })
        );
      });
  };
  const handleChangeQuantity = (e) => {
    let newQuantity = e.target.value;
    if (newQuantity === '0') {
      deleteItem();
    } else if (newQuantity === '>10') {
      setOpenInput(true);
    } else {
      cartApi
        .updateItem({
          cartId: cart.current.id,
          quantity: newQuantity,
          cartBookItemId: item.id,
        })
        .then((cart) => {
          dispatch(cartSlice.actions.setSuccess(cart));
          dispatch(
            noticeSlice.actions.show({
              title: 'Đã cập nhật',
              type: 'success',
            })
          );
        })
        .catch(() => {
          dispatch(
            noticeSlice.actions.show({
              title: 'Có lỗi xảy ra',
              type: 'error',
            })
          );
        });
    }
  };
  const handleInputChange = () => {
    cartApi
      .updateItem({
        cartId: cart.current.id,
        cartBookItemId: item.id,
        quantity: inputQuantity,
      })
      .then((cart) => {
        dispatch(cartSlice.actions.setSuccess(cart));
        dispatch(
          noticeSlice.actions.show({
            title: 'Đã cập nhật',
            type: 'success',
          })
        );
        if (inputQuantity <= 10) setOpenInput(false);
      })
      .catch(() => {
        dispatch(
          noticeSlice.actions.show({
            title: 'Có lỗi xảy ra',
            type: 'error',
          })
        );
      });
  };
  return (
    <>
      <ContainerRow>
        <ContainerFlex>
          {openInput ? (
            <>
              <Input
                type='number'
                value={inputQuantity}
                onChange={(e) => setInputQuantity(e.target.value)}
                onFocus={() => setIsFocusInput(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsFocusInput(false);
                  }, 300)
                }
              />
              {isFocusInput && (
                <Button
                  sx={{
                    textTransform: 'none',
                    lineHeight: '1.2',
                    fontSize: '0.7rem',
                    borderRadius: '0.75rem',
                    minWidth: '30px',
                    marginTop: '4px',
                  }}
                  color='error'
                  onClick={handleInputChange}
                >
                  Lưu
                </Button>
              )}
            </>
          ) : (
            <SelectBox
              defaultValue={item.quantity}
              onChange={handleChangeQuantity}
            >
              <option value='0'>0 (Xoá)</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='>10'>{'>10'}</option>
            </SelectBox>
          )}
        </ContainerFlex>
        <ContainerFlex>
          <IconButton
            aria-label='delete'
            size='small'
            onClick={() => deleteItem()}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </ContainerFlex>
      </ContainerRow>
    </>
  );
}
function CartItem({ item }) {
  return (
    <CartItemContainer>
      <Card>
        <Link to='/'>
          <CardMedia
            component='img'
            image={`${process.env.REACT_APP_API_URL}${item.bookItem.image}`}
            alt={item.bookItem.header}
          />
          <CardContent sx={{ p: 1 }}>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              sx={{
                textAlign: 'center',
                fontSize: 12,
                color: 'primary.main',
                p: 0,
                m: 0,
                border: 'none',
              }}
            >
              {`${normalizeNumber(
                item.bookItem.price * (1 - item.bookItem.discount)
              )}đ`}
            </Typography>
          </CardContent>
        </Link>
        <CardActions sx={{ pt: 0 }}>
          <ItemControl item={item} />
        </CardActions>
      </Card>
    </CartItemContainer>
  );
}
function CartOverview() {
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const cartElement = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (!cartElement.current.contains(e.target)) {
        cartElement.current.classList.add('slide-out');
        setTimeout(() => {
          dispatch(cartSlice.actions.close());
        }, 490);
      }
    };
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  return (
    <>
      {cart.current !== null && (
        <CartContainer className='shadow-short cart' ref={cartElement}>
          <CartContent>
            <CartHeader>
              <SubTotal>Tổng tiền</SubTotal>
              <SubTotalNumber>{`${normalizeNumber(
                cart.current.subTotal
              )}đ`}</SubTotalNumber>
              <Button
                variant='contained'
                color='primary'
                size='small'
                fullWidth
                disableElevation
                sx={{
                  my: '12px',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  p: '2px',
                  textTransform: 'none',
                }}
              >
                Thanh toán
              </Button>
              <Divider sx={{ width: '100%' }} />
            </CartHeader>
          </CartContent>
          <CartBody>
            {cart.current.bookItems.map((bookItem) => (
              <CartItem key={bookItem.id} item={bookItem} />
            ))}
          </CartBody>
        </CartContainer>
      )}
    </>
  );
}

export default CartOverview;
