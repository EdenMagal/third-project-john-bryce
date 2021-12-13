import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './comp/Login'
import Register from './comp/Register'
import Reports from './comp/Reports'
import Vacations from './comp/Vacations'

export default function App() {

  
  return (
    <div>

      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/vacations" component={Vacations} />
        <Route path="/reports" component={Reports} />
      </BrowserRouter>
    </div>
  )
}


