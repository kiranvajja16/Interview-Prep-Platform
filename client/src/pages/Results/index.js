import { useEffect,useState } from 'react'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'



const Results = () => {
  const {token}=useAuth()
  const [results,setResults]=useState([])

  useEffect(()=>{
    fetchResults()
  },[])

  const fetchResults=async ()=>{
    try{
        const response= await api.get('/results/my-results',{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        })
        setResults(response.data)
    }
    catch(err){
      console.log(err)
      alert('Failed to load results')
    }
  }

  return(
    <div>
      <h1>My Results</h1>
      {results.length === 0 ? (
        <p>No quiz attempts yet.</p>
      ):(
        results.map(result => (
          <div key={result._id}>
            <h3>{result.quiz.title}</h3>
            <p>Score : {result.score}</p>
            <p>Total Questions : {result.totalQuestions}</p>
            <p>Percentage : {result.percentage}%</p>
            <hr/>
          </div>
        ))
      )}
    </div>
  )
}

export default Results