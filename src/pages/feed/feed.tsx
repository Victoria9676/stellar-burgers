import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/slices/feed-slice';

export const Feed = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const dispatch = useDispatch();

  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (error) {
    return <p>error: {error}</p>;
  }

  const handleGetFeeds = (): void => {
    // TODO: Запросить ленту заказов
    dispatch(getFeeds())
  };

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
