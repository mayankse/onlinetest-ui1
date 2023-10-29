import axios from "axios";
//const BASE_URL="http://localhost:2020/"
const BASE_URL="https://server1-zeta.vercel.app/"
class ServerCall
{
    static fnSendGetReq(url)
    {
        return axios.get(BASE_URL+url)
    }
}
export default ServerCall;