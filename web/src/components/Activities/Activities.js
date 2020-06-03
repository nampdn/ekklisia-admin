import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: String!) {
    deleteActivity(id: $id) {
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

const ActivitiesList = ({ activities }) => {
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete activity ' + id + '?')) {
      deleteActivity({ variables: { id }, refetchQueries: ['ACTIVITIES'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>id</th>
            <th>slug</th>
            <th>name</th>
            <th>color</th>
            <th>orgId</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{truncate(activity.id)}</td>
              <td>{truncate(activity.slug)}</td>
              <td>{truncate(activity.name)}</td>
              <td>{truncate(activity.color)}</td>
              <td>{truncate(activity.orgId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.activity({ id: activity.id })}
                    title={'Show activity ' + activity.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editActivity({ id: activity.id })}
                    title={'Edit activity ' + activity.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete activity ' + activity.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(activity.id)}
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

export default ActivitiesList
