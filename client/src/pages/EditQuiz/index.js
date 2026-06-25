import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'

const EditQuiz = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {token} = useAuth()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTitle(response.data.title)
      setDescription(response.data.description)
      setQuestions(response.data.questions)
    } catch (err) {
      console.log(err)
      alert('Failed to load quiz')
    }
  }
    fetchQuiz()
  }, [id,token])

  const handleQuestionChange=(index,value)=>{
    const updatedQuestions = [...questions]
    updatedQuestions[index].question=value
    setQuestions(updatedQuestions)
  }

  const handleOptionChange=(questionIndex,optionIndex,value)=>{
    const updatedQuestions=[...questions]
    updatedQuestions[questionIndex].options[optionIndex]=value
    setQuestions(updatedQuestions)
  }

  const handleCorrectAnswerChange=(index,value)=>{
    const updatedQuestions=[...questions]
    updatedQuestions[index].correctAnswer=value
    setQuestions(updatedQuestions)
  }

  const handleUpdate = async e =>{
    e.preventDefault()
    try{
        await api.put(`/quizzes/${id}`,{title,description,questions},{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        alert('Quiz Updated Successfully')
        navigate('/instructor')
    }
    catch(err){
        console.log(err)
    }
  }

  return (
    <div>
      <h1>Edit Quiz</h1>
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        />

      {questions.map((question, index) => (
        <div key={question._id}>
          <h3>Question {index + 1}</h3>

          <input type="text" value={question.question}
          onChange={e => handleQuestionChange(index,e.target.value)}/>

          {question.options.map((option, optionIndex) => (
            <input type="text" value={option} onChange={e=>handleOptionChange(index,optionIndex,e.target.value)}/>
          ))}

          <input type="text" value={question.correctAnswer}
          onChange={e => handleCorrectAnswerChange(index,e.target.value)}/>

          <hr />
        </div>
      ))}
      <button type="submit">
        Update Quiz
      </button>
    </form>
    </div>
  )
}

export default EditQuiz