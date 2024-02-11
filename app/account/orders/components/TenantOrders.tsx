import type { OrderResponse } from '@/common/types/Order/order';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';
import OrderItem from './OrderItem';
import OrderMessage from './OrderMessage';
import { User } from '@/common/types/User/user';

const TenantOrders = ({
  tenants,
}: {
  tenants: OrderResponse['tenant_orders'];
}) => {
  return tenants?.map((to) => (
    <div key={to.id} className="flex items-start flex-col justify-start">
      <div className="flex justify-between w-full  max-sm:items-baseline">
        <div className="flex items-start justify-start gap-4 max-sm:flex-col max-sm:gap-2">
          <span className="my-1">
            <Link
              href={`/vendor/${to.tenant.id}`}
              aria-label="Satıcıya git"
              className="text-sm text-secondary"
            >
              {to.tenant.nickname}
            </Link>{' '}
            <span className="text-sm text-gray-500">satıcısından</span>{' '}
            <span className="text-sm text-gray-500">
              ({to.order_items.length} ürün)
            </span>
          </span>
          <StatusBadge status={to.order_status.value} />
        </div>

        <OrderMessage tenant={to.tenant as User} orderTenantId={to.id} />
      </div>

      <OrderItem order_items={to.order_items} />
    </div>
  ));
};

export default TenantOrders;
