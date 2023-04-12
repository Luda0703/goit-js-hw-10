//import './css/styles.css';

//const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list')
const URL =  `https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages`;

fetch(URL)
.then((response) => response.json())
.then((data) => {
    console.log("data", data);
     insertContent(data);
})
.catch((error) => {
    console.log("error", error);
})

const createListItem = (item) => `<li>
    <img src="${item.flags}" alt="${item.flags}">
    <h2>${item.name}</h2>
    <h1>${item.capital}</h1>
    <p>${item.population}</p>
    <p>${item.languages}</p>
</li>`;

const generateContant = (array) => array.reduce((acc, item) => acc + createListItem(item), '');

const insertContent = (array) => {
    const result = generateContant(array);
    countryList.insertAdjacentHTML('beforeend', result);
}