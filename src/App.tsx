import React from 'react'
import './App.css'
import { patchData } from './utils/apiService'

function App() {
 
  async function test() {
    const formData =  {
      title: 'tikit',
      description: 'lorem',
      subject: 'job',
      frequency: 'daily',
      repeatOption: 'daily',
      time: '22',
    }
    patchData('schedules/1', formData).then(() =>{ 
   
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
