import React from 'react'
import './App.css'
import { deleteData } from './utils/apiService'

function App() {
 
  async function test() {
    
    deleteData('schedules/1').then(() =>{ 
   
      console.log("patching data") 
    })
   
  }
    test()
  return (
      <>
        hi
      </>
      
  )
}

export default App
