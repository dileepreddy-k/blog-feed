import axios from 'axios';
const  headers =  {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
}
export default axios.create({
    headers
})