
import './App.css'
import { fetchData } from './utils/apiService'

function App() {
 
  async function test() {
    fetchData("schedules").then((result) =>{
  
      console.log(result)
      
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
