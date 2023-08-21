import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from 'pages/HomePage/HomePage';
import PhonebookPage from 'pages/PhonebookPage/PhonebookPage';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refresh } from 'Redux/Auth/AuthOperations';
import { useSelector } from 'react-redux';
import { selectRefreshed } from 'Redux/Auth/AuthSelectors';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import Spinner from './Spinner/Spinner';
import { selectIsLoading } from 'Redux/Contacts/Selectors';
import { ToastContainer } from 'react-toastify';

export function App() {
  const dispatch = useDispatch();
  const isRefreshed = useSelector(selectRefreshed);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    !isRefreshed && (
      <>
        <ToastContainer />
        {loading && <Spinner />}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={Register}
                  redirectTo="/phonebook"
                ></RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  component={Login}
                  redirectTo="/phonebook"
                ></RestrictedRoute>
              }
            />

            <Route
              path="phonebook"
              element={
                <PrivateRoute
                  component={PhonebookPage}
                  redirectTo="/login"
                ></PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </>
    )
  );
}
