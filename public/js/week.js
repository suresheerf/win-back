import axios from "axios";
import { showAlert } from "./alerts";
export const createWeek = async (week,wdescrip)=>{
    try{
        const res = await axios({
             method: 'PATCH',
             url: `/api${window.location.pathname}/w`,
             data:{
                week,
                wdescrip
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','Week created successfuly');
             window.setTimeout(()=>{
                 location.assign(window.location.pathname);
             },5000);
         }
    } 
    catch(err) {
     
       console.log('error',`${err.response.data.message}`);
    //    showAlert('error',`${err.response.data.message}`);

    }
}

export const removeWeek = async (id)=>{
    try{
        const res = await axios({
             method: 'DELETE',
             url: `/api${window.location.pathname}/w`,
             data:{
                 id
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','Week deleted successfuly');
             window.setTimeout(()=>{
                 location.assign(window.location.pathname);
             },5000);
         }
    } 
    catch(err) {
     
        showAlert('error',`${err.response.data.message}`);
        // console.log('error',`${err.response.data.message}`);

    }
}