// utilizzo app.js per manipolazione del DOM
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    
    const { cityDets, weather } = data;

    //aggiorno il template di details
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
 `;

    //aggiorno le immagini e le icone di giorno e notte
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // const result = condition ? 'value 1' : 'value 2'  operatore ternario 

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc)

     // rimuovo la classe d-none class se presente
     if(card.classList.contains('d-none')){          // se l'elemento card contiene la classe 'd-none'
         card.classList.remove('d-none')            // la rimuovo
     }

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets,weather }  
}

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();


    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

})

    // lascio l'ultima città cercata nel local storage della pagina
    if(localStorage.getItem('city')) {
        updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}