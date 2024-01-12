import React from 'react'
import './App.css'
import { postData } from './utils/apiService'

function App() {
 
  async function test() {
    const formData =  {
      title: 'nik',
      description: 'lorem',
      subject: 'job',
      frequency: 'daily',
      repeatOption: 'daily',
      time: '22',
    }
    postData('schedules', formData).then(() =>{ 
      console.log("posting data") 
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
