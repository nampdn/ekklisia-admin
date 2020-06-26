import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: String!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

const Group = ({ group }) => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      navigate(routes.groups())
      location.reload()
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete group ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Group {group.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>name</th>
              <td>{group.name}</td>
            </tr><tr>
              <th>year</th>
              <td>{group.year}</td>
            </tr><tr>
              <th>leaderId</th>
              <td>{group.leaderId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editGroup({ id: group.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(group.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Group
