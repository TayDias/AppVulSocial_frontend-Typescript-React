import axios from 'axios'

const blipApi = axios.create({
    baseURL: 'https://msging.net/commands',
    headers: {'Authorization' : process.env.BLIP_KEY, 'Content-Type': "application/json"}
})

export default blipApi