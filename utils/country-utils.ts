import { Countries, Country } from "./types";

export function getPopulationAverage(countries: Countries = []) {
  const total = countries
    .map((country) => country.population)
    .reduce((sum, population) => sum + population, 0);
  return total / countries.length;
}

export function getCountryWithTheSmallestArea(countries: Countries = []) {
  const sortedCountries = countries
    .filter(Boolean)
    .sort((a, b) => a.area - b.area);
  return sortedCountries[0]?.name;
}

export function getCountryWithTheBiggestArea(countries: Countries = []) {
  const sortedCountries = countries
    .filter(Boolean)
    .sort((a, b) => a.area - b.area);
  return sortedCountries[sortedCountries.length - 1]?.name;
}

export function getLanguages(country: Country) {
  return country.languages?.map((language) => language.name);
}

export type LanguagesData = Record<
  string,
  { language: string; countries: string[]; population: number }
>;

export function getLanguagesByCountry(countries: Countries) {
  const languages = countries?.flatMap(getLanguages);

  const uniqueLanguages = Array.from(new Set(languages));

  const data: LanguagesData = {};

  uniqueLanguages.forEach((language) => {
    const filteredCountries = countries.filter((country) =>
      getLanguages(country).includes(language)
    );

    data[language] = {
      language: language,
      countries: filteredCountries.map((country) => country?.name),
      population: filteredCountries.reduce(
        (sum, country) => sum + country?.population,
        0
      ),
    };
  });

  return data;
}
