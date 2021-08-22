import axios from "axios";
import { showAlert } from "./alerts";

export const forgotPassword = async (email)=>{
    try{     
           const res = await axios({
             method: 'POST',
             url: '/api/users/forgetPassword',
             data:{
                email
             }
         });
         if(res.data.status === 'success'){
            showAlert('success','Password reset link sent')
            window.setTimeout(()=>{
               location.assign('/login');
            },5000);
        }

    } catch(err) {

        showAlert('error',err.response.data.message);

    }
}
