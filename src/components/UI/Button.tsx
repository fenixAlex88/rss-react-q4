import { ReactElement } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}): ReactElement => {
  return <button {...props}>{children}</button>;
};

export default Button;
