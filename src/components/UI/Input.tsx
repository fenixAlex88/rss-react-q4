import { ReactElement } from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}): ReactElement => {
  return <input {...props} />;
};

export default Input;
