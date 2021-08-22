import '@babel/polyfill'
import { login } from './login'
import { signup } from './signup';
import { logout } from './login';
import { createCourse } from './createCourse';
import { updateUserData } from './updatesettings';
import { forgotPassword } from './forgotPassword';
import { resetPassword } from './resetPassword';


const loginForm = document.querySelector('.form');
const signupForm = document.querySelector('.signupForm');
const logoutBtn = document.querySelector('.logout');
const createCourseForm = document.querySelector('.createCourseForm');
const userDetailsForm = document.querySelector('.userDetailsForm');
const changePasswordForm = document.querySelector('.changePasswordForm');
const forgotPasswordForm = document.querySelector('.forgotPasswordForm');
const resetPasswordForm = document.querySelector('.resetPasswordForm');

// const detailsBtn = document.querySelector('.datails');
if(signupForm){

    signupForm.addEventListener('submit',e=>{
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const name = firstName+' '+lastName;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    
        signup(name,email,password,confirmPassword)
    });
}
if(createCourseForm){

    let wnumber = 1;
    let lnumber = 1;
    const addweek = document.querySelector('.addweek');
    addweek.addEventListener('click',()=>{

        const weekTemp = ` <h6> week ${wnumber}</h6>
                          <input class="form-control" type="text" placeholder="week" id="week${wnumber}"/>
                          <br/>
                          <input class="form-control" type="text-area" placeholder="week description" id="wdescription${wnumber}"/>"
                          <br/>
                          <h6>lessons</h6>
                          <input class="form-control" type="text" placeholder="lesson name" id="lnameundefined"/>
                          <br/>
                          <input class="form-control" type="url" name="llink" placeholder="lesson link" id="llinkundefined"/>
                          <button class="btn addlesson${lnumber}">add lesson</button>`
        addweek.insertAdjacentHTML('beforebegin',weekTemp);
        wnumber++;
    })
    createCourseForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const img = document.getElementById('img').value;
    const week = document.getElementById('week').value;
    const wdescription = document.getElementById('wdescription').value;
    const lname = document.getElementById('lname').value;
    const llink = document.getElementById('llink').value;

   const course ={
                name,
                duration,
                description,
                price,
                img,
                caricullum :[
                                {   week,
                                    description:wdescription,
                                    links: [{name:lname ,link:llink}]}
                                
                            ]
                
            }

   createCourse(course);
})}

if(logoutBtn) logoutBtn.addEventListener('click',logout)

if(loginForm){

    loginForm.addEventListener('submit',e=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
    
        const password = document.getElementById('password').value;
        login(email,password)
    });
}

if(userDetailsForm){

    userDetailsForm.addEventListener('submit',e=>{
        e.preventDefault();
        const form = new FormData();
        form.append('name',document.getElementById('name').value);
        form.append('email',document.getElementById('email').value);
        form.append('img',document.getElementById('userImg').files[0]);
       
        updateUserData(form,'data');
    });
}
if(changePasswordForm){

    changePasswordForm.addEventListener('submit',e=>{
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        updateUserData({currentPassword,newPassword,confirmNewPassword},'password');
    });
}

if(forgotPasswordForm){
    forgotPasswordForm.addEventListener('submit',e=>{
        e.preventDefault();

        const email = document.getElementById('email').value;
        forgotPassword(email);
    })
}

if(resetPasswordForm){
    resetPasswordForm.addEventListener('submit',e=>{
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        resetPassword(password,confirmPassword);
    })
}
