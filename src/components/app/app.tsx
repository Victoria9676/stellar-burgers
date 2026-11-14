import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@pages';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ProtectedRoute } from '@components/protected-route';

import { getUser, setAuthChecked } from '../../services/slices/auth-slice';
import {
  getIngredients,
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError,
} from '../../services/slices/slice';
import { useDispatch, useSelector } from '../../services/store';

import type { TLocationState } from '../../utils/types';

import '../../index.css';

import styles from './app.module.css';

const IngredientDetailsPage = (): React.JSX.Element => (
  <div className={styles.detailPageWrap}>
    <h1 className={`${styles.detailHeader} text text_type_main-large`}>
      Детали ингредиента
    </h1>
    <IngredientDetails />
  </div>
);

const OrderDetailsPage = (): React.JSX.Element => {
  const { number } = useParams();

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`${styles.detailHeader} text text_type_main-large`}>#{number}</h1>
      <OrderInfo />
    </div>
  );
};

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = (location.state as TLocationState)?.background;

  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredientsError = useSelector(selectIngredientsError);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    void dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      void dispatch(getUser());
    } else {
      void dispatch(setAuthChecked());
    }
  }, [dispatch]);

  const handleClose = (): void => {
    void navigate(-1);
  };

  const OrderModal = (): React.JSX.Element => {
    const { number } = useParams();

    return (
      <Modal title={`детали заказа №${number ?? ''}`} onClose={handleClose}>
        <OrderInfo />
      </Modal>
    );
  };

  if (isIngredientsLoading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  if (ingredientsError) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.message} text text_type_main-large`}>
          Не удалось загрузить ингредиенты
        </h1>
      </div>
    );
  }

  if (!ingredients.length) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <h1 className="text text_type_main-large">Нет ингредиентов</h1>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderDetailsPage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/feed/:number" element={<OrderModal />} />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path="/profile/orders/:number" element={<OrderModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
