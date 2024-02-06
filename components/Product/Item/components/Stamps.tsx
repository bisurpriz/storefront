import Tooltip from '@/components/Tooltip';
import React from 'react';

const ProductCardStamps = () => {
  return (
    <div className="flex items-center justify-start gap-2 rounded-md ps-2">
      {[
        {
          description: 'Kargo Bedava',
          icon: '🚚',
        },
        {
          description: 'İade Garantisi',
          icon: '🔄',
        },
        {
          description: 'Taksit Seçenekleri',
          icon: '💳',
        },
      ].map((item) => (
        <div
          key={item.description}
          className="flex items-center gap-2 text-base text-gray-500 mt-2"
        >
          <Tooltip text={item.description} position="top">
            <span>{item.icon}</span>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default ProductCardStamps;
