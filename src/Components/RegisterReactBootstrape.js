import React, { useState } from 'react'; 

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const auth=getAuth(app)

const RegisterReactBootstrape = () => {
    const [passwordError, setPasswordError]=useState('')
    const [success, setSuccess]=useState(false)

    const handleSubmit=(event)=>{
        event.preventDefault()
        setSuccess(false)
        const form=event.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        console.log(name,email,password)


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
        verifyEmail()
        updateUserName(name)
       })
       
    }

    const verifyEmail=()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('please verify your email')
        })
    }




   
    const updateUserName=(name)=>{
        updateProfile(auth.currentUser,{
            displayName:name 

        })
        .then(()=>{
            console.log('display name updated')
        })
        .catch(error=>console.log(error))


    }


    return (
        <div>

<form onSubmit={handleSubmit} className='w-50 mx-auto'>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                <input type="name" name='name' placeholder='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' placeholder='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                
            </div>


            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' placeholder='password' className="form-control" id="exampleInputPassword1" required/>
            </div>
            <p>{passwordError}</p>
            {success && <p>successfully</p>}
           
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>Have an accoutn ? plese Login <Link to='/login'>Login</Link></p>
</form>
            
        </div>
    );
};

export default RegisterReactBootstrape;