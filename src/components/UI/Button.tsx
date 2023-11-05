import { ReactElement } from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}): ReactElement => {
  return (
    <button
      className={classNames(
        className,
        'h-10 bg-gray-800 text-white text-base ml-2.5 px-5'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
