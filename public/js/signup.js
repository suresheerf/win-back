import axios from "axios";
import { showAlert } from "./alerts";

export const signup = async (name,email,password,confirmPassword)=>{
    try{
        console.log('befor axios');
              
           const res = await axios({
             method: 'POST',
             url: '/api/users/signup',
             data:{
                name,
                email,
                password,
                confirmPassword
             }
         });
         if(res.data.status === 'success'){
            showAlert('success','signup success')
            window.setTimeout(()=>{
                location.assign('/');
            },500);
        }

    } catch(err) {

        showAlert('error',err.response.data.message);

    }
}
