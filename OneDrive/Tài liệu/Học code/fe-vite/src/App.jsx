import React, { useEffect } from 'react';
import Header from './component/header';
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Book from './component/Book';
import BookDetail from './component/BookDetail';
import LoginPage from './page/login';
import SignUpPage from './page/signUpPage';
import { callLogin, callRemainLogin } from './controller/api';
import { useDispatch } from 'react-redux';
import { checkUser, remainAccess } from './redux/login/action';
import UserPage from './page/userPage';
import CartPage from './page/cartPage';
import AdminPage from './page/adminPage';
import Crud from './component/auth/crud';
import Product from './component/product';
import UserDetail from './component/userDetail';
import OrderList from './component/orderList';
import Expressing from './component/expressing';
import Confirm from './component/auth/confirmProduct';
import Expreed from './component/auth/expressed';
import Details from './component/auth/detail';
import DetailsExpress from './component/auth/detail';

const Layout = () => {

  return (
    <div style={{ height: "100vh", background: " rgb(228, 228, 228)" }} >
      <Header></Header>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "book",
        element: <Book></Book>
      },
      {
        path: 'book-detail/:id',
        element: <BookDetail></BookDetail>
      },
    ]
  },
  {
    path: 'login',
    element: <LoginPage></LoginPage>
  },
  {
    path: 'signup',
    element: <SignUpPage></SignUpPage>
  },
  {
    path: 'userpage',
    element: <UserPage></UserPage>,
    children: [
      {
        path: 'userdetail',
        element: <UserDetail></UserDetail>
      },
      {
        path: 'order',
        element: <OrderList></OrderList>
      },
      {
        path: 'expressing',
        element: <Expressing></Expressing>
      }
    ]
  },
  {
    path: 'cartPage',
    element: <CartPage></CartPage>
  },
  {

    path: "/admin",
    element: <AdminPage></AdminPage>,
    children: [
      {
        path: 'crud',
        element: <Crud></Crud>
      },
      {
        path: 'product',
        element: <Product></Product>
      },
      {
        path: 'confirm',
        element: <Confirm></Confirm>
      },
      {
        path: 'expressing',
        element: <Expreed></Expreed>
      },
      {
        path: 'detail',
        element: <DetailsExpress></DetailsExpress>
      },
    ]
  }
]);

export default function App() {

  const dispatch = useDispatch();
  const getAcc = async () => {

    const res = await callRemainLogin(localStorage.getItem('access_token'));
    if (res.statusCode === 201) {
      console.log('lmao', res)
      dispatch(remainAccess(res));
    }
  }

  useEffect(() => {
    getAcc();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}
