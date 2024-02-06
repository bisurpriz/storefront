import { forwardRef } from 'react';

export const NumberCustomInput = forwardRef(
  (
    props: React.ComponentPropsWithoutRef<'input'> & {
      ownerState: any;
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { ownerState, ...other } = props;

    const colors = (() => {
      // with border text and hover - focus
      switch (props.color) {
        case 'primary':
          return 'text-primary border-primary hover:border-primary focus:border-primary focus-visible:border-primary';
        case 'error':
          return 'text-error border-error hover:border-error focus:border-error focus-visible:border-error';
        case 'warning':
          return 'text-warning border-warning hover:border-warning focus:border-warning focus-visible:border-warning';
        case 'secondary':
          return 'text-secondary border-secondary hover:border-secondary focus:border-secondary focus-visible:border-secondary';
        case 'success':
          return 'text-success border-success hover:border-success focus:border-success focus-visible:border-success';
        case 'info':
          return 'text-info border-info hover:border-info focus:border-info focus-visible:border-info';
        default:
          return 'text-primary border-primary hover:border-primary focus:border-primary focus-visible:border-primary';
      }
    })();

    return (
      <input
        ref={ref}
        {...other}
        className={`text-lg font-normal leading-5
        bg-white dark:slate-50
        border dark:border-slate-200
        rounded-md
        px-1 py-2
        transition-colors duration-200
        focus-visible:outline-none
        w-16
        text-center
        border-x-0
        ${colors}
        `}
        autoComplete="off"
      />
    );
  }
);
