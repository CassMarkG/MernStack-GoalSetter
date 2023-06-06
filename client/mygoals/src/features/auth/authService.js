import axios from "axios";

const apiUrl = '/api/users/';

//Regsiter User
const Register = async (doThis) => {
  
    const response = await axios.post(apiUrl,doThis);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data
}

//Login user method
const Login = async (dothis2) => {
    const response = await axios.post(apiUrl + 'login',dothis2);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout user method
const Logout = () => {
    localStorage.removeItem('user')
}


const authService = {Register,Login,Logout};

export default authService;