import axios from "axios";
import { showAlert } from "./alerts";

export const resetPassword = async (password , confirmPassword)=>{
    try{   
           const res = await axios({
             method: 'PATCH',
             url: `/api${window.location.pathname}`,
             data:{
                password,
                confirmPassword
             }
         });
         if(res.data.status === 'success'){
            showAlert('success','Password reset success')
            window.setTimeout(()=>{
               location.assign('/login');
            },5000);
        }

    } catch(err) {

        showAlert('error',err.response.data.message);

    }
}
