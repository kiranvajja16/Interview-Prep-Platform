import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../../components/Layout'
import api from '../../services/api'
import {useAuth} from '../../context/AuthContext'
import Loader from '../../components/Loader'

import './index.css'

const Results = () => {
  const navigate = useNavigate()

  const {token} = useAuth()

  const [results, setResults] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await api.get('/results/my-results', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setResults(response.data)

      setLoading(false)
    } catch (err) {
      console.log(err)

      setLoading(false)
    }
  }

  const getPerformance = percentage => {
    if (percentage >= 90) {
      return 'Excellent 🎉'
    }

    if (percentage >= 75) {
      return 'Very Good 👍'
    }

    if (percentage >= 50) {
      return 'Good 🙂'
    }

    return 'Needs Improvement 📚'
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

      <div className="results-container">

        <h1>My Quiz Results</h1>

        {results.length === 0 ? (
          <div className="empty-results">

            <h2>No Results Yet</h2>

            <p>
              Complete a quiz to view your results.
            </p>

            <button
              className="dashboard-btn"
              onClick={() => navigate('/candidate')}
            >
              Go To Dashboard
            </button>

          </div>
        ) : (
          <div className="results-grid">

            {results.map(result => (
              <div
                className="result-card"
                key={result._id}
              >

                <h2>{result.quiz.title}</h2>

                <div className="score-box">

                  <h3>Score</h3>

                  <p>
                    {result.score} / {result.totalQuestions}
                  </p>

                </div>

                <div className="percentage-box">

                  <h3>Percentage</h3>

                  <p>
                    {result.percentage.toFixed(0)}%
                  </p>

                </div>

                <div className="performance-box">

                  {getPerformance(result.percentage)}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </Layout>
  )
}

export default Results