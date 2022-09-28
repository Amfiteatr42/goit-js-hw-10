import './css/styles.css';
import { fetchCountries } from './js/fetch-countries';
import debounce from 'lodash.debounce';
import { Notify, Report } from 'notiflix';

const refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

// НАВЕСТИ ПОРЯДОК В THEN
function onInputSearch(e) {
  let searchName = e.target.value.trim();
  fetchCountries(
    `https://restcountries.com/v3.1/name/${searchName}?${searchParams}`
  ).then(data => {
    refs.countryList.innerHTML = createListMarkup(data);
    if (data.length > 10) {
      Notify.warning(
        'Too many matches found. Please enter a more specific name'
      );
      return;
    }
    if (data.length > 2 && data.length < 10) {
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = createListMarkup(data);
    }

    if (data.length === 1) {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = createCountryMarkup(data);
    }
  });
}

function createListMarkup(data) {
  return data
    .map(
      country =>
        `<li class="country-item">
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="20", height="20"/>
      <p>${country.name.official}</p>
    </li>`
    )
    .join('');
}

function createCountryMarkup(data) {
  const { flags, capital, population, languages, name } = data[0];
  const langStr = Object.values(languages).join(', ');

  return `
<h2 class="title"><img src="${flags.svg}" alt="Flag of ${name.official}" width="20", height="20"/>${name.official}</h2>
<ul>
  <li>
    <p><span>Capital: </span>${capital}</p>
  </li>
  <li>
    <p><span>Population: </span>${population}</p>
  </li>
  <li>
    <p><span>Languages: </span>${langStr}</p>
  </li>
</ul>`;
}
