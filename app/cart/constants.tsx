import { FaCartPlus } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';
import { MdOutlineConfirmationNumber, MdPayments } from 'react-icons/md';

export const cartStepperPaths = [
  {
    path: '/cart',
    label: 'Sepet',
    icon: <FaCartPlus />,
  },
  {
    path: '/cart/order-detail',
    label: 'Teslimat Bilgileri',
    icon: <IoInformationCircle />,
  },
  {
    path: '/cart/checkout',
    label: 'Ödeme',
    icon: <MdPayments />,
  },
  {
    path: '/cart/complete',
    label: 'Onay',
    icon: <MdOutlineConfirmationNumber />,
  },
];
