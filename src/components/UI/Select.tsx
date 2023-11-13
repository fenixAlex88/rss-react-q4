import { ReactElement } from 'react';
import classNames from 'classnames';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = ({
  className,
  ...props
}): ReactElement => {
  return (
    <select
      className={classNames(
        className,
        'm-3 px-4 h-10 bg-gray-700 border border-gray-300 text-gray-100 text-sm'
      )}
      {...props}
    ></select>
  );
};

export default Select;
