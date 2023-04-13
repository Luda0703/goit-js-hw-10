import './css/styles.css';
import {fetchCountries} from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const cauntryInfo = document.querySelector('.country-info')
const inputText = document.querySelector('input#search-box');

inputText.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    const inputValue = e.target.value.trim();
    if (!inputValue) {
        resetMarkup(countryList);
        resetMarkup(cauntryInfo);
        return;
      }


    fetchCountries(inputValue)
    .then((data) => {
    //console.log("data", data);
    if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
        }
     insertContent(data);
    })
    .catch((error) => {
        resetMarkup(countryList);
        resetMarkup(cauntryInfo);
        Notiflix.Notify.failure('Oops, there is no country with that name')
    })

}

function resetMarkup(el) {
    el.innerHTML = '';
  }

  function countryListItem(item) {
    return item.map(
        ({ name, flags }) =>
          `<li class="link">
          <img src="${flags.png}" alt="${name.official}" width="60" height="40"> 
          <p class = "list-name";>${name.official}</p>
          </li>`
      )
      .join('');
  };

function countryInfoItem(item) {
    return item.map(
        ({ name, capital, population, flags, languages }) =>
          ` <div class="cauntry-items">  
          <img src="${flags.png}" alt="${name.official}" width="200" height="100">
          <h1>${name.official}</h1>
          <p>Capital: ${capital}</p>
          <p>Population: ${population}</p>
          <p>Languages: ${Object.values(languages)}</p></div>`
      );
}

function insertContent(country) {
    if (country.length === 1) {
        resetMarkup(countryListItem);
        cauntryInfo.innerHTML = countryInfoItem(country);
    } else {
        resetMarkup(countryInfoItem);
      countryList.innerHTML = countryListItem(country);
    }
  };


