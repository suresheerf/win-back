import axios from "axios";
import { showAlert } from "./alerts";

 export const updateUserData = async (data,type)=>{
    try{
        console.log('before axios',data,type)
        const url = type === 'password'? '/api/users/updatePassword':'/api/users/updateMe';
        const res = await axios({
             method: 'PATCH',
             url,
             data
         });
          const msg =  type==='password'?'password updated':'DATA updated'
         if(res.data.status === 'success'){
             showAlert('success',msg);
             window.setTimeout(()=>{
                location.reload();
             },500);
         }
    } 
    catch(err) {
     
       showAlert('error',`${err.response.data.message}`);

    }
}