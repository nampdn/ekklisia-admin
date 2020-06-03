import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_ATTENDANCE_MUTATION = gql`
  mutation DeleteAttendanceMutation($id: String!) {
    deleteAttendance(id: $id) {
      id
    }
  }
`

const Attendance = ({ attendance }) => {
  const [deleteAttendance] = useMutation(DELETE_ATTENDANCE_MUTATION, {
    onCompleted: () => {
      navigate(routes.attendances())
      location.reload()
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete attendance ' + id + '?')) {
      deleteAttendance({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Attendance {attendance.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>id</th>
              <td>{attendance.id}</td>
            </tr><tr>
              <th>slug</th>
              <td>{attendance.slug}</td>
            </tr><tr>
              <th>status</th>
              <td>{attendance.status}</td>
            </tr><tr>
              <th>createdAt</th>
              <td>{attendance.createdAt}</td>
            </tr><tr>
              <th>updatedAt</th>
              <td>{attendance.updatedAt}</td>
            </tr><tr>
              <th>groupId</th>
              <td>{attendance.groupId}</td>
            </tr><tr>
              <th>scheduleId</th>
              <td>{attendance.scheduleId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAttendance({ id: attendance.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(attendance.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Attendance
