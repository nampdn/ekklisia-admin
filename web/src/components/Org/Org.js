import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_ORG_MUTATION = gql`
  mutation DeleteOrgMutation($id: String!) {
    deleteOrg(id: $id) {
      id
    }
  }
`

const Org = ({ org }) => {
  const [deleteOrg] = useMutation(DELETE_ORG_MUTATION, {
    onCompleted: () => {
      navigate(routes.orgs())
      location.reload()
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete org ' + id + '?')) {
      deleteOrg({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Org {org.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>id</th>
              <td>{org.id}</td>
            </tr><tr>
              <th>name</th>
              <td>{org.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOrg({ id: org.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(org.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Org
