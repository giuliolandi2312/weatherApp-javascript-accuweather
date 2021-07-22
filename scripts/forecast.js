// utilizzo forecast.js per gestire le api
const key = 'oKfplvYGTYRVYsOraRupvve910PVksSl';

// ottengo le informazioni sul tempo
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0]
}

// ottengo le informazioni sulla città
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];   // utilizzo l'indice 0 per prendermi l'insieme di valori più prossimo alla mia richiesta

}

