import axios from "axios";
import { showAlert } from "./alerts";
export const createLesson = async (w,name,link)=>{
    try{
        const res = await axios({
             method: 'PATCH',
             url: `/api${window.location.pathname}/${w}`,
             data:{
                name,
                link
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','Lesson created successfuly');
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

export const removeLesson = async (id)=>{
    try{
        const res = await axios({
             method: 'DELETE',
             url: `/api${window.location.pathname}/${id}`,
             data:{
                 id
             }
         });
         if(res.data.status === 'success'){
             showAlert('success','lesson deleted successfuly');
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