import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import ExpensiveComponent from './components/ExpensiveComponent'
import RegisterForm from './components/RegisterForm'


function App() {

  return (
    <>
      <ExpensiveComponent />
      <hr />
      <RegisterForm/>
    </>
  )
}

export default App
