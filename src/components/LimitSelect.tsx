import Select from './UI/Select';

interface LimitSelectProps {
  perPage: string;
  values: string[];
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LimitSelect: React.FC<LimitSelectProps> = ({
  perPage,
  onSelect,
  values,
}) => {
  return (
    <label className="ml-4">
      Items per page
      <Select value={perPage} onChange={onSelect}>
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </Select>
    </label>
  );
};

export default LimitSelect;
