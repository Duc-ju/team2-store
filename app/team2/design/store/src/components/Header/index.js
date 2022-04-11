import HeaderRef from './HeaderRef';
import { useState, useEffect, useRef } from 'react';
import CartOverview from './CartOverview';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector, userSelector } from '../../redux/selectors';
import cartApi from '../../api/cartApi';
import cartSlice from './cartSlice';

import noticeSlice from '../../redux/noticeSlice';
function Header() {
  const [duplicate, setDuplicate] = useState(false);
  const [position, setPosition] = useState({
    right: 24,
    width: null,
    top: 12,
  });
  const [openNotifications, setOpenNotifications] = useState(false);
  const headerElement = useRef();
  const cart = useSelector(cartSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setDuplicate(true);
      else setDuplicate(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPosition({
        top: headerElement.current.offsetTop,
        width: headerElement.current.offsetWidth,
        right: headerElement.current.getBoundingClientRect().y,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    setPosition({
      top: headerElement.current.offsetTop,
      width: headerElement.current.offsetWidth,
      right: headerElement.current.getBoundingClientRect().y,
    });
  }, []);
  useEffect(() => {
    if (cart.current === null && user.current !== null) {
      dispatch(cartSlice.actions.setFetching());
      cartApi
        .getCart(user.current.cart)
        .then((cart) => {
          dispatch(cartSlice.actions.setSuccess(cart));
        })
        .catch(() => {
          dispatch(cartSlice.actions.close());
          dispatch(
            noticeSlice.actions.show({
              title: 'Tải giỏ hàng không thành công',
              type: 'error',
            })
          );
        });
    }
  });
  return (
    <>
      <HeaderRef
        isBase
        duplicated={duplicate}
        headerElement={headerElement}
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
      />
      {!duplicate ? null : (
        <>
          <HeaderRef
            duplicate={duplicate}
            position={position}
            openNotifications={openNotifications}
            setOpenNotifications={setOpenNotifications}
          />
        </>
      )}
      {cart.isShown && cart.current !== null && <CartOverview />}
    </>
  );
}

export default Header;
