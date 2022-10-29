const axios = require('axios');
const fs = require('fs');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();

    }

    get historialCapitalizado(){

        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');

        })


    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY, //Esta es la viarable de entorno que tengo en .env
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            //const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?language=es&access_token=pk.eyJ1IjoiY3Jpc3JtcnoyMDAxIiwiYSI6ImNsOXJyc3U0ejBpdnQzdm1kY2E2OHVyM24ifQ.I5nyfRjIcdc9b_Dcmks3MQ&limit=5`);
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            return [];
        }

    }

    async climaLugar(lat, lon) {

        try {

            //https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=ad63f4c53df7b057af15b9e0b4aeb934&units=metric&lang=es

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error)
        }

    }

    agregarHistorial( lugar = '' ) {

        if( this.historial.includes( lugar.toLowerCase() ) ){
            return
        }

        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerDB() {

        if( !fs.existsSync( this.dbPath ) ){
            return;
        }

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );

        const data = JSON.parse( info );

        this.historial = data.historial;

    }

}

module.exports = Busquedas;