import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';



const auth=getAuth(app)

const LoginBootstrap = () => {

    const [success, setSuccess]=useState(false)
    const [passwordError , setPasswordError]=useState('')

   const [userEmail, setUserEmail]=useState('')

    const handleSubmit=event=>{
        event.preventDefault()
        setSuccess(false)
       
        const form=event.target
        const email=form.email.value
        const password=form.password.value

        console.log(email,password)

        if(password.length<6){
            setPasswordError('please provide 6 characters')
            return;
        }
        setPasswordError ('')

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user=result.user
            console.log(user)
            success(true)

        })
        .catch(error=>{
            console.error('error',error)
            setSuccess(error.message)
            form.reset('')
          

        })

    }

const handleEmailBlur=(event)=>{
    const email=event.target.value;
    setUserEmail(email)
    console.log(email)
}
  const handleForgetPassword=()=>{
    sendPasswordResetEmail(auth, userEmail)
    .then(()=>{
        alert('reset email send')
    })
  }




    // const handleEmailBlur=(event)=>{
    //     const email=event.target.value;
    //     setUserEmail(email)
    //     console.log(email)
    // }

    // const handleForgetPassword=()=>{
    //     sendPasswordResetEmail(auth, userEmail)
    //     .then(()=>{
    //         alert('password reset email  sent. please check your email')
    //     })
    //     .catch(error=>{
    //         console.error(error)
    //     })
    // }
    

    return (
        <div>
            <h2 className='d-flex justify-content-center'>PLEASE LOGIN</h2>

               <form onSubmit={handleSubmit} className="mb-3 w-50 mx-auto" >

                        <div >
                        <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                        <input onBlur={handleEmailBlur}   type="text" className="form-control" name='email' id="formGroupExampleInput" placeholder="email" required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                        <input type="text" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Password" required/>
                        </div>
                        
                        <button  type="submit" className="btn btn-danger">Login</button>
                        {success && <p>successfully login</p>}
                        <p>{passwordError}</p>
                        

                        <p >new to website? please <Link to='/register'>Register</Link></p>
                        <p>Forget Password <button onClick={ handleForgetPassword} type="button" class="btn btn-danger">Reset</button></p>
                        

               </form>
              

               
            


        </div>
    );
};

export default LoginBootstrap;

