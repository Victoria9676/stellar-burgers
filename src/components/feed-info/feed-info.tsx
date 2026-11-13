import { FeedInfoUI } from '@ui';

import { selectFeedState } from '../../services/slices/feed-slice';
import { useSelector } from '../../services/store';

import type { TOrder } from '@utils-types';

const max_orders = 20;

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, max_orders);

export const FeedInfo = (): React.JSX.Element => {
  const feed = useSelector(selectFeedState);

  const readyOrders = getOrders(feed.orders, 'done');

  const pendingOrders = [
    ...getOrders(feed.orders, 'created'),
    ...getOrders(feed.orders, 'pending'),
  ].slice(0, max_orders);

  return (
    <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />
  );
};
