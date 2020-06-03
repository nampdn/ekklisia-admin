import { useMutation } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: String!) {
    deleteProfile(id: $id) {
      id
    }
  }
`

const Profile = ({ profile }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    onCompleted: () => {
      navigate(routes.profiles())
      location.reload()
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Profile {profile.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>id</th>
              <td>{profile.id}</td>
            </tr><tr>
              <th>fullName</th>
              <td>{profile.fullName}</td>
            </tr><tr>
              <th>gender</th>
              <td>{profile.gender}</td>
            </tr><tr>
              <th>oldId</th>
              <td>{profile.oldId}</td>
            </tr><tr>
              <th>slug</th>
              <td>{profile.slug}</td>
            </tr><tr>
              <th>email</th>
              <td>{profile.email}</td>
            </tr><tr>
              <th>facebookId</th>
              <td>{profile.facebookId}</td>
            </tr><tr>
              <th>phoneNumber</th>
              <td>{profile.phoneNumber}</td>
            </tr><tr>
              <th>birthday</th>
              <td>{profile.birthday}</td>
            </tr><tr>
              <th>joinDate</th>
              <td>{profile.joinDate}</td>
            </tr><tr>
              <th>dayOfBirth</th>
              <td>{profile.dayOfBirth}</td>
            </tr><tr>
              <th>monthOfBirth</th>
              <td>{profile.monthOfBirth}</td>
            </tr><tr>
              <th>yearOfBirth</th>
              <td>{profile.yearOfBirth}</td>
            </tr><tr>
              <th>createdAt</th>
              <td>{profile.createdAt}</td>
            </tr><tr>
              <th>updatedAt</th>
              <td>{profile.updatedAt}</td>
            </tr><tr>
              <th>orgId</th>
              <td>{profile.orgId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editProfile({ id: profile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(profile.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Profile
