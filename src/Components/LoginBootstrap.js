import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';



const auth=getAuth(app)

const LoginBootstrap = () => {
    const [success, setSuccess]=useState(false)
    const [userEmail,setUserEmail]=useState('')

    const handleSubmit=event=>{
        event.preventDefault();
        setSuccess(false)
        const form =event.target;
        const email =form.email.value;
        const password= form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user =result.user
            console.log(user)
            setSuccess(true)
        })
        .catch(error=>{
            console.log('error', error)
        })
    }

    const handlEmailBlur=event=>{
        const email=event.target.value 
        setUserEmail(email);
        console.log(email)

    }





const handleForgetPassword=()=>{
    if(!userEmail){
        alert('pleaser enter your email address')
    }
    sendPasswordResetEmail(auth,userEmail )
    .then(()=>{
        alert('password reset email sent')
    })
    .catch(error=>{
        console.error(error)
    })
}



    return (
        <div className='w-50 mx-auto'>
            <h1> please login</h1>
            <form  >
            <div class="mb-3">
  <label htmlFor="formGroupExampleInput" class="form-label">Email</label>
  <input onBlur={handlEmailBlur} type="text" name='email' class="form-control" id="formGroupExampleInput" placeholder="your email" required/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" name='password' class="form-label">password</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="password" required/>
</div>
<button type='submit bg-danger'>Login</button>
            </form>
            {success && <p>successfully login</p>}
            <p>have an account? please login<Link to='/register'>register</Link></p>
            <p>Forget Password<button onClick={handleForgetPassword}>button</button></p>
           
        </div>
    );
};

export default LoginBootstrap;