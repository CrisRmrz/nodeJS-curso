const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {
        //TODO: leer DB si existe

    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
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
            console.log(resp.data)

            return []; //retornar los lugares
        } catch (error) {
            return [];
        }

    }

}

module.exports = Busquedas;