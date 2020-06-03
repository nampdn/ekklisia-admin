import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_ORG_MUTATION = gql`
  mutation DeleteOrgMutation($id: String!) {
    deleteOrg(id: $id) {
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

const OrgsList = ({ orgs }) => {
  const [deleteOrg] = useMutation(DELETE_ORG_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete org ' + id + '?')) {
      deleteOrg({ variables: { id }, refetchQueries: ['ORGS'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org) => (
            <tr key={org.id}>
              <td>{truncate(org.id)}</td>
              <td>{truncate(org.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.org({ id: org.id })}
                    title={'Show org ' + org.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOrg({ id: org.id })}
                    title={'Edit org ' + org.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete org ' + org.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(org.id)}
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

export default OrgsList
