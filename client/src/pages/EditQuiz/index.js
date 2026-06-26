import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Layout from '../../components/Layout'
import CustomButton from '../../components/CustomButton'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'
import Loader from '../../components/Loader'

import './index.css'

const EditQuiz = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {token} = useAuth()

  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [questions, setQuestions] = useState([])

  const [errors, setErrors] = useState({})

  // -------------------------
  // Fetch Quiz
  // -------------------------

  useEffect(() => {
    fetchQuiz()
  },[id,token])

  const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const quiz = response.data

      setTitle(quiz.title)
      setDescription(quiz.description)
      setQuestions(quiz.questions)

      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error('Failed to load quiz')
      navigate('/instructor')
    }
  }

  // -------------------------
  // Validation
  // -------------------------

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = 'Quiz title is required'
    }

    if (!description.trim()) {
      newErrors.description =
        'Quiz description is required'
    }

    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question-${index}`] =
          'Question is required'
      }

      question.options.forEach((option, optionIndex) => {
        if (!option.trim()) {
          newErrors[`option-${index}-${optionIndex}`] =
            'Option is required'
        }
      })

      if (!question.correctAnswer.trim()) {
        newErrors[`correct-${index}`] =
          'Correct answer is required'
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // -------------------------
  // Question Handlers
  // -------------------------

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions]

    updatedQuestions[index].question = value

    setQuestions(updatedQuestions)
  }

  const handleOptionChange = (
  questionIndex,
  optionIndex,
  value
) => {
  const updatedQuestions = [...questions]

  updatedQuestions[questionIndex].options[optionIndex] = value

  setQuestions(updatedQuestions)
}

  const handleCorrectAnswerChange = (
    index,
    value
  ) => {
    const updatedQuestions = [...questions]

    updatedQuestions[index].correctAnswer = value

    setQuestions(updatedQuestions)
  }

  // -------------------------
  // Add Question
  // -------------------------

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ])
  }

  // -------------------------
  // Remove Question
  // -------------------------

  const removeQuestion = index => {
    if (questions.length === 1) {
      toast.warning('At least one question is required.')
      return
    }

    const updatedQuestions = questions.filter(
      (_, i) => i !== index
    )

    setQuestions(updatedQuestions)
  }

  // -------------------------
  // Update Quiz
  // -------------------------

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await api.put(
        `/quizzes/${id}`,
        {
          title,
          description,
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success('Quiz updated successfully.')

      navigate('/instructor')
    } catch (err) {
      console.log(err)

      toast.error(
        err.response?.data?.message ||
          'Failed to update quiz.'
      )
    }
  }

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

    return (
    <Layout>
      <div className="edit-quiz-container">
        <h1>Edit Quiz</h1>
        <div className="edit-banner">
        Update your quiz details and save the changes.
        </div>
        <form onSubmit={handleSubmit} noValidate>

          {/* Quiz Title */}

          <div className="form-group">

            <label>Quiz Title</label>

            <input
              type="text"
              placeholder="Enter quiz title"
              value={title}
              className={errors.title ? 'input-error' : ''}
              onChange={e => setTitle(e.target.value)}
            />

            {errors.title && (
              <p className="error">
                {errors.title}
              </p>
            )}

          </div>

          {/* Description */}

          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Enter quiz description"
              value={description}
              className={
                errors.description
                  ? 'input-error'
                  : ''
              }
              onChange={e =>
                setDescription(e.target.value)
              }
            />

            {errors.description && (
              <p className="error">
                {errors.description}
              </p>
            )}

          </div>

          {/* Questions */}

          {questions.map((question, index) => (
            <div
              className="question-card"
              key={question._id || index}
            >

              <div className="question-header">

                <h3>
                  Question {index + 1}
                </h3>

                {questions.length > 1 && (
                  <CustomButton
                    text="Remove"
                    variant="danger"
                    type="button"
                    onClick={() =>
                      removeQuestion(index)
                    }
                  />
                )}

              </div>

              {/* Question */}

              <div className="form-group">

                <label>Question</label>

                <input
                  type="text"
                  value={question.question}
                  className={
                    errors[`question-${index}`]
                      ? 'input-error'
                      : ''
                  }
                  onChange={e =>
                    handleQuestionChange(
                      index,
                      e.target.value
                    )
                  }
                />

                {errors[`question-${index}`] && (
                  <p className="error">
                    {
                      errors[
                        `question-${index}`
                      ]
                    }
                  </p>
                )}

              </div>

              {/* Options */}

              {question.options.map(
                (option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="form-group"
                  >

                    <label>
                      Option {optionIndex + 1}
                    </label>

                    <input
                      type="text"
                      value={option}
                      className={
                        errors[
                          `option-${index}-${optionIndex}`
                        ]
                          ? 'input-error'
                          : ''
                      }
                      onChange={e =>
                        handleOptionChange(
                          index,
                          optionIndex,
                          e.target.value
                        )
                      }
                    />

                    {errors[
                      `option-${index}-${optionIndex}`
                    ] && (
                      <p className="error">
                        {
                          errors[
                            `option-${index}-${optionIndex}`
                          ]
                        }
                      </p>
                    )}

                  </div>
                )
              )}

              {/* Correct Answer */}

              <div className="form-group">

                <label>
                  Correct Answer
                </label>

                <select
                  value={question.correctAnswer}
                  className={
                    errors[`correct-${index}`]
                      ? 'input-error'
                      : ''
                  }
                  onChange={e =>
                    handleCorrectAnswerChange(
                      index,
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Correct Answer
                  </option>

                  {question.options.map(
                    (option, optionIndex) => (
                      <option
                        key={optionIndex}
                        value={option}
                        disabled={!option}
                      >
                        {option ||
                          `Option ${
                            optionIndex + 1
                          }`}
                      </option>
                    )
                  )}

                </select>

                {errors[`correct-${index}`] && (
                  <p className="error">
                    {
                      errors[
                        `correct-${index}`
                      ]
                    }
                  </p>
                )}

              </div>

            </div>
          ))}

          <div className="button-group">

            <CustomButton
              text="Add Question"
              variant="primary"
              type="button"
              onClick={addQuestion}
            />

            <CustomButton
              text="Update Quiz"
              variant="success"
              type="submit"
            />

          </div>

        </form>

      </div>
    </Layout>
  )
}

export default EditQuiz