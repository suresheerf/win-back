import '@babel/polyfill'
import { login } from './login'
import { signup } from './signup';
import { logout } from './login';
import { createCourse } from './createCourse';

const loginForm = document.querySelector('.form');
const signupForm = document.querySelector('.signupForm');
const logoutBtn = document.querySelector('.logout');
const createCourseForm = document.querySelector('.createCourseForm');
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
    
        console.log(name,email,password,confirmPassword);
    
        signup(name,email,password,confirmPassword)
    });
}
if(createCourseForm) createCourseForm.addEventListener('submit', e=>{
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


    console.log(course);

   createCourse(course);
})

if(logoutBtn) logoutBtn.addEventListener('click',logout)

if(loginForm){

    loginForm.addEventListener('submit',e=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        console.log(email);
    
        const password = document.getElementById('password').value;
        console.log(password);
        login(email,password)
    });
}
