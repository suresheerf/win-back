import  axios  from "axios";
import { showAlert } from "./alerts";
export const createCourse = async (course)=>{
        try{
           
            const res = await axios({
                 method: 'POST',
                 url: '/api/courses/',
                 data:{
                     ...course
                 }
             });
            
             if(res.data.status === 'success'){
                 showAlert('success','New course created');
                 window.setTimeout(()=>{
                     location.assign('/courses');
                 },500);
             }
        } 
        catch(err) {
         
           console.log(err);
    
        }
    }
