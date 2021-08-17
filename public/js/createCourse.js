import  axios  from "axios";
import { showAlert } from "./alerts";
export const createCourse = async (course)=>{
        try{
            console.log('befor axios');
            const res = await axios({
                 method: 'POST',
                 url: '/api/courses/',
                 data:{
                     ...course
                 }
             });
             console.log(res);
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
