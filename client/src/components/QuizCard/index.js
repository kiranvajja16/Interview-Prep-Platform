import CustomButton from '../CustomButton'
import './index.css'

const QuizCard = ({
  quiz,
  role,
  onTakeQuiz,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="quiz-card">

      <h2 className="quiz-title">
        {quiz.title}
      </h2>

      <p className="quiz-description">
        {quiz.description}
      </p>

      <p className="quiz-count">
        Questions : {quiz.questions?.length || 0}
      </p>

      <div className="quiz-actions">

        {role === 'candidate' && (
          <CustomButton
            text="Take Quiz"
            variant="primary"
            onClick={() => onTakeQuiz(quiz._id)}
          />
        )}

        {role === 'instructor' && (
          <>
            <CustomButton
              text="Edit"
              variant="warning"
              onClick={() => onEdit(quiz._id)}
            />

            <CustomButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(quiz._id)}
            />
          </>
        )}

      </div>

    </div>
  )
}

export default QuizCard