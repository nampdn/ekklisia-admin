import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: String!) {
    deleteGroup(id: $id) {
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

const GroupsList = ({ groups }) => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete group ' + id + '?')) {
      deleteGroup({ variables: { id }, refetchQueries: ['GROUPS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Tên nhóm</th>
            <th>Nhóm trưởng</th>
            <th>Số thành viên</th>
            <th>Năm</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{truncate(group.name)}</td>
              <td>{truncate(group.leader ? group.leader.fullName : "")}</td>
              <td>{truncate(group.members.length)}</td>
              <td>{truncate(group.year)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.group({ id: group.id })}
                    title={'Show group ' + group.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGroup({ id: group.id })}
                    title={'Edit group ' + group.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete group ' + group.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(group.id)}
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

export default GroupsList
