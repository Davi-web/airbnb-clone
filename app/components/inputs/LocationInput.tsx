import useCountries from '@/app/hooks/useCountries';
import { FC } from 'react';
import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface LocationInputProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const LocationInput: FC<LocationInputProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        options={getAll()}
        isClearable
        getOptionLabel={(option) => option.label}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        isSearchable={true}
        placeholder="Select a country"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: '#ffe4e6',
            primary: 'black',
          },
        })}
      />
    </div>
  );
};

export default LocationInput;
