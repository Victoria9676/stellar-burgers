import { FeedInfoUI } from '@ui';

import type { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectFeedState } from '../../services/slices/feed-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const feed = useSelector(selectFeedState);

  const readyOrders = getOrders(feed.orders, 'done');

  const pendingOrders = [
    ...getOrders(feed.orders, 'created'),
    ...getOrders(feed.orders, 'pending')
  ].slice(0, 20);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
