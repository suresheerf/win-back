 import axios from "axios";
 import { showAlert } from "./alerts";
 export const login = async (email,password)=>{
    try{
        console.log('befor axios');
        const res = await axios({
             method: 'POST',
             url: '/api/users/login',
             data:{
                 email,
                 password
             }
         });
         console.log(res);
         if(res.data.status === 'success'){
             showAlert('success','login success');
             window.setTimeout(()=>{
                 location.assign('/');
             },500);
         }
    } 
    catch(err) {
     
       showAlert('error',`${err.response.data.message}`);

    }
}


export const logout = async ()=>{
    try{
        console.log('befor axios');
        const res = await axios({
             method: 'GET',
             url: '/api/users/logout'
         });

         if ((res.data.status === 'success')) location.assign('/')
    } 
    catch(err) {
     
       showAlert('error','Error logging out ,try again later');

    }
}
