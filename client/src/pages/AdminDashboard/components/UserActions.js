import CustomButton from '../../../components/CustomButton'



const UserActions = ({
  user,
  onPromote,
  onDelete,
}) => {
  return (
    <div className="action-buttons">

      {user.role === 'candidate' ? (
        <CustomButton
          text="Promote"
          variant="success"
          onClick={() => onPromote(user._id)}
        />
      ) : (
        <span className="already-instructor">
          Instructor
        </span>
      )}

      <CustomButton
        text="Delete"
        variant="danger"
        onClick={() => onDelete(user._id)}
      />

    </div>
  )
}

export default UserActions