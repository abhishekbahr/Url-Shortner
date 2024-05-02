
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/home",
    element:<Home/>
  },
])
function App() {
  
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
