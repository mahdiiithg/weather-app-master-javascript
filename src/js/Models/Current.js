import axios from 'axios';
import { renderError , clearLoader } from '../Views/base'

// Turn navigator.location in promise
function getLocation(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            ({code, msg}) => 
                reject(
                    Object.assign(new Error(msg), {name: 'PositionError', code})
                ),
            options
        )
    })
}

// Class Current Weather
export default class Current {
    constructor() {
        this.coords = [];
    }
    // get croods of current location]
    async getCoords() {
        try {
            const data = await getLocation({
                enableHighAccuracy: true,
                maximumAge: 0,
            });
            this.coords = [data.coords.latitude , data.coords.longitude]
        } catch (err) {
            const parent = document.querySelector('.main__weather');

            // Clear loader
            clearLoader(parent);
      
            // Render error
            renderError(parent, 'You have to enable the location.');
        }
    }

    // Check if coords are on the object
    coordAvailable() {
        return this.coords.length;
    }

    // Get Current weather API data
    
    async getWeather() {
        try {
            const res = await axios.get(`
            https://api.openweathermap.org/data/2.5/weather?lat=${this.coords[0]}&lon=${this.coords[1]}&units=metric&appid=${process.env.APIKEY}
            `)

            // Saving data on Objects
            this.name = res.data.name
            this.country = res.data.sys.country
            this.weather = {
                temp: Math.round(res.data.main.temp),
                temp_max: Math.round(res.data.main.temp_max),
                temp_min: Math.round(res.data.main.temp_min),
                name: res.data.weather[0].main,
                icon: res.data.weather[0].icon,
              };
            } catch (err) {
              
              const parent = document.querySelector('.main__weather');
        
              // Clear loader
              clearLoader(parent);
        
              // Render error
              renderError(parent, 'Try Again Something Went Wrong');
            }
          }
        }