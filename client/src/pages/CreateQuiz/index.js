import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'

const CreateQuiz = ()=>{
    const navigate = useNavigate()
    const {token}=useAuth()

    const [title,setTitle] =useState('')
    const [description,setDescription]=useState('')
    const [questions,setQuestions]=useState([
        {
            question: '',
            options: ['','','',''],
            correctAnswer: '',
        },
    ])

    const handleQuestionChange = (index,value)=>{
        const updatedQuestions=[...questions]
        updatedQuestions[index].question=value
        setQuestions(updatedQuestions)
    }
    const handleOptionChange=(questionIndex,optionIndex,value)=>{
        const updatedQuestions = [...questions]
        updatedQuestions[questionIndex].options[optionIndex]=value
        setQuestions(updatedQuestions)
    }

    const handleCorrectAnswerChange=(index,value)=>{
        const updatedQuestions=[...questions]
        updatedQuestions[index].correctAnswer=value
        setQuestions(updatedQuestions)
    }

    const handleAddQuestion =()=>{
        setQuestions([...questions,{question:'',options:['','','',''],correctAnswer:'',},])
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            await api.post('/quizzes',{title,description,questions,},{headers:{
                Authorization:`Bearer ${token}`,
            },})
            alert('Quiz created successfully')
            navigate('/instructor')
        }
        catch(err){
            console.log(err)
            alert('Failed to create quiz')
        }
    }

    return (
        <div>
            <h1>Create Quiz</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Quiz Title' value={title}
                onChange={e=>setTitle(e.target.value)}/>
                <br/>
                <br/>
                 <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <br/>
                <br/>
                {questions.map((question,index)=>(
                    <div key={index}>
                        <h3>Question {index+1}</h3>
                        <input type="text" placeholder='Question' value={question.question}
                        onChange={e => handleQuestionChange(index,e.target.value)}/>
                        <br/><br/>
                         <input
                            type="text"
                            placeholder="Option 1"
                            value={question.options[0]}
                            onChange={e => handleOptionChange(index,0,e.target.value)}
                        />
                        <br /><br />

                        <input
                            type="text"
                            placeholder="Option 2"
                            value={question.options[1]}
                            onChange={e => handleOptionChange(index,1,e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="text"
                            placeholder="Option 3"
                            value={question.options[2]}
                            onChange={e => handleOptionChange(index,2,e.target.value)}
                        />
                        <br /><br />
                        <input
                            type="text"
                            placeholder="Option 4"
                            value={question.options[3]}
                            onChange={e => handleOptionChange(index,3,e.target.value)}
                        />
                        <br /><br />

                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={question.correctAnswer}
                            onChange={e=>{handleCorrectAnswerChange(index,e.target.value)}}
                        />

                    <hr />      
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit">
                    Create Quiz
                </button>
            </form>
        </div>
    )
}

export default CreateQuiz