import api from "../services/apiService";
import { formateDate } from "../helpers/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCities = {};
    this.airlines = {};
    this.airlinesDbl = null;
    this.formateDate = helpers.formateDate;
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
      this.api.airlinesDouble(),
    ]).catch((err) => console.log(`init: ${err}`));

    const [countries, cities, airlines, airlinesDouble] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCities = this.createShortCities(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    this.airlinesDbl = airlinesDouble;
    // console.log(this.airlinesDbl);

    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (city) => city.full_name === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : null;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  // *переделать createShortCities
  createShortCities(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }
  // *переделать serialize
  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name},${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }
}

const locations = new Locations(api, { formateDate });

export default locations;
