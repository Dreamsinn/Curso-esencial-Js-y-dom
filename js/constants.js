export const API_KEY = '3ca8b44c0259667d7df390f1dffefd17'
export const BASE_API = 'https://api.openweathermap.org/data/2.5/'

// si miras en la pagina de la API te dice que que (por egemplo) de 200 a 215 son tipos de luvia, para hacerlo mas facil, y como no tenemos las imagenes
// para todos lo tipos vamos a reducir a la centena (210 -> 2) y leugo que mire en esta constante
export const weatherConditionsCodes = {
    2: 'rainy',
    3: 'drizzle',
    5: 'rainy',
    6: 'drizzle',
    7: 'cloudy',
    8: 'clean',
}

