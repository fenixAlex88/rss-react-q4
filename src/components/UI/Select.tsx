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
        'm-3 px-4 h-10 bg-gray-50/50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 backdrop-blur-lg'
      )}
      {...props}
    ></select>
  );
};

export default Select;
