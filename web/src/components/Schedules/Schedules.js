import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: String!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const SchedulesList = ({ schedules }) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id }, refetchQueries: ['SCHEDULES'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Hoạt động</th>
            <th>Nhóm đã điểm danh</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{timeTag(schedule.date)}</td>
              <td>{truncate(schedule.activity.name)}</td>
              <td>{truncate(schedule.attendances.length || 0)}/15</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.schedule({ id: schedule.id })}
                    title={'Show schedule ' + schedule.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSchedule({ id: schedule.id })}
                    title={'Edit schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(schedule.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SchedulesList
