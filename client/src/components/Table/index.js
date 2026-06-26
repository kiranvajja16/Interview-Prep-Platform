import './index.css'

const Table = ({columns, data, renderActions}) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}

            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              {columns.map(column => (
                <td key={column}>
                  {item[column.toLowerCase()]}
                </td>
              ))}

              {renderActions && (
                <td className="actions-column">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table