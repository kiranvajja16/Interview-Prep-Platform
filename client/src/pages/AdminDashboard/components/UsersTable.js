import Table from '../../../components/Table'
import UserActions from './UserActions'



const UsersTable = ({
  users,
  onPromote,
  onDelete,
}) => {
  return (
    <div className="users-section">

      <h2 className="users-heading">
        Users Management
      </h2>

      <Table
        columns={['Name', 'Email', 'Role']}
        data={users}
        renderActions={user => (
          <UserActions
            user={user}
            onPromote={onPromote}
            onDelete={onDelete}
          />
        )}
      />

    </div>
  )
}

export default UsersTable