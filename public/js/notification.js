import axios from "axios";
import { showAlert } from "./alerts";
export const createNotification = async (title,notification)=>{
    try{
        console.log('inside create notification before axios')
        const res = await axios({
             method: 'POST',
             url: '/api/notification',
             data:{
                 title,
                 notification
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','notification created successfuly');
             window.setTimeout(()=>{
                 location.assign('/');
             },5000);
         }
    } 
    catch(err) {
     
       showAlert('error',`${err.response.data.message}`);

    }
}

export const removeNotification = async (id)=>{
    try{
        console.log('inside create notification before axios')
        const res = await axios({
             method: 'DELETE',
             url: '/api/notification',
             data:{
                 id
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','notification deleted successfuly');
             window.setTimeout(()=>{
                 location.assign('/');
             },5000);
         }
    } 
    catch(err) {
     
       showAlert('error',`${err.response.data.message}`);

    }
}