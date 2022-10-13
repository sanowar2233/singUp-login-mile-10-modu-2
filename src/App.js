import {getAuth} from 'firebase/auth'
import './App.css';
import app from './firebase/firebase.init';

import RegisterReactBootstrape from './Components/RegisterReactBootstrape';

const auth=getAuth(app)
const handleRegister =(event)=>{
  event.preventDefault()
  const email= event.target.email.value;
  const password =event.target.password.value
  console.log(email,password)
 


}
const  handleEmailChange=(event)=>{
  console.log(event.target.value)
}




function App() {

  return (
    <div >
      <RegisterReactBootstrape></RegisterReactBootstrape>
    </div>
  );
}

export default App;
