import React, { useState } from 'react'; 

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../firebase/firebase.init';


const auth=getAuth(app)

const RegisterReactBootstrape = () => {
    const [passwordError, setPasswordError]=useState('')
    const [success, setSuccess]=useState(false)

    const handleSubmit=(event)=>{
        event.preventDefault()
        setSuccess(false)
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)


        if(password.length<6){
            setPasswordError('please set 6 character')
            return;
        }
        setPasswordError('')


       createUserWithEmailAndPassword(auth, email, password)
       .then(result=>{
        const user= result.user;
        success(true)
        console.log(user)
       })
       .catch(error=>{
        console.log('error',error)
        setSuccess(error.message)
        form.reset('')
       })
       
    }
    return (
        <div>

<form onSubmit={handleSubmit} className='w-50 mx-auto'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' placeholder='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' placeholder='password' className="form-control" id="exampleInputPassword1"/>
            </div>
            <p>{passwordError}</p>
            {success && <p>successfully</p>}
           
            <button type="submit" className="btn btn-primary">Submit</button>
</form>
            
        </div>
    );
};

export default RegisterReactBootstrape;