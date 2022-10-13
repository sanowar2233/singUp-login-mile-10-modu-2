import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';


const auth=getAuth(app)

const RegisterReactBootstrape = () => {
    const [passwordError, setPasswordError]=useState('')
    const [success, setSuccess]=useState(false)

    const handleRegister=event=>{
        event.preventDefault();

        setSuccess(false)


        const form=event.target
        const email = form.email.value
        const password =form.password.value 
        console.log(email,password)

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('please provide at least two uppercase')
            return;

        }

        if(password.length<6){
            setPasswordError('please provide at least 6 character')
            return;
        }

        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user=result.user;
            console.log(user)
            setSuccess(true)
            form.reset();
        })
        .catch(error=>{
            console.error('error', error)
            setPasswordError(error.message)
        })
     
      


    }


    return (
        <div className='w-50 mx-auto'>


     <h3 className='text-warning'>please register</h3>
      <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" required />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" required />
      </Form.Group>
      

      <p className='text-danger'>{passwordError}</p>
      {success &&  <p className='text-success'>user created successfully</p>}


      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>

            
        </div>
    );
};

export default RegisterReactBootstrape;