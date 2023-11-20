import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Log from './pages/Log'
import Cart from './pages/Cart'
import SignUp from './pages/SignUp'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/admin" element={<Log />}/>
      <Route path="/client" element={ <Cart />}/>
      <Route path="/sign_up" element={ <SignUp />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
