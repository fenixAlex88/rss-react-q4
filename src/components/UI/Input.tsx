import { ReactElement } from 'react';
import classNames from 'classnames';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}): ReactElement => {
  return (
    <input
      className={classNames(
        className,
        'w-80 h-10 border text-lg p-2.5 border-solid border-neutral-400'
      )}
      {...props}
    />
  );
};

export default Input;
