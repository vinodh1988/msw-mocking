import axios from 'axios'
import {useState,useEffect} from 'react'

const App = ()=>{
    let [first,setFirst]=useState("")
    let [last,setLast]=useState("")

    useEffect(()=>{
      let fetchData= async ()=>{
         let response = await axios.get("https://randomuser.me/api/")
         setFirst(response.data.results[0].name.first)
         setLast(response.data.results[0].name.last)
      }
      fetchData()
  },[])

   if(first==="")
      return (<h3>Loading....</h3>)


    return(
       <div>
         <form>
           First Name<input type="text"
              aria-label="first"
              value={first}
              onChange={(e)=>setFirst(e.target.value)}
            /> <br/>
            Last Name<input type="text"
              value={last}
              aria-label="last"
              onChange={(e)=>setLast(e.target.value)}
            /><br/>
         </form>
         <h2 >
           FirstName: {first}, LastName: {last}
         </h2>
       </div>
    );
}

export default App;