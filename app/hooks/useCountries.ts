import countries from 'world-countries';

const fromattedCountries = countries.map((country) => ({
  label: country.name.common,
  value: country.cca2,
  latlng: country.latlng,
  region: country.region,
  flag: country.flag,
}));

const useCountries = () => {
  const getAll = () => fromattedCountries;
  const getCountryByValue = (value: string) => {
    return fromattedCountries.find((country) => country.value === value);
  };
  return {
    getAll,
    getCountryByValue,
  };
};

export default useCountries;
