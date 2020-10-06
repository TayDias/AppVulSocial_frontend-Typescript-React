import axios from 'axios'

const api = axios.create({
    //Production
    //baseURL: 'https://proj-vs-api.herokuapp.com/'
    
    //Dev
    baseURL: 'http://localhost:3030'
})

export default api