
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginBootstrap from './Components/LoginBootstrap';
import Main from './Components/Main/Main';
import RegisterReactBootstrape from './Components/RegisterReactBootstrape';




function App() {
  const router=createBrowserRouter([
    {path:'/', element:<Main></Main>,children:[
      {path:'/', element: <RegisterReactBootstrape></RegisterReactBootstrape>},
      {
        path:'/register', element:<RegisterReactBootstrape></RegisterReactBootstrape>
      },
      {
        path:'/login',element:<LoginBootstrap></LoginBootstrap>
      }
        ]}
  ])
 
  return (
    <div >

       <RouterProvider router={router}></RouterProvider>
      

      
    </div>
  );
}

export default App;
