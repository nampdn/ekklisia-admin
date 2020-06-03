import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: String!) {
    deleteProfile(id: $id) {
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

const ProfilesList = ({ profiles }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id }, refetchQueries: ['PROFILES'] })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>id</th>
            <th>fullName</th>
            <th>gender</th>
            <th>oldId</th>
            <th>slug</th>
            <th>email</th>
            <th>facebookId</th>
            <th>phoneNumber</th>
            <th>birthday</th>
            <th>joinDate</th>
            <th>dayOfBirth</th>
            <th>monthOfBirth</th>
            <th>yearOfBirth</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>orgId</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{truncate(profile.id)}</td>
              <td>{truncate(profile.fullName)}</td>
              <td>{truncate(profile.gender)}</td>
              <td>{truncate(profile.oldId)}</td>
              <td>{truncate(profile.slug)}</td>
              <td>{truncate(profile.email)}</td>
              <td>{truncate(profile.facebookId)}</td>
              <td>{truncate(profile.phoneNumber)}</td>
              <td>{timeTag(profile.birthday)}</td>
              <td>{timeTag(profile.joinDate)}</td>
              <td>{truncate(profile.dayOfBirth)}</td>
              <td>{truncate(profile.monthOfBirth)}</td>
              <td>{truncate(profile.yearOfBirth)}</td>
              <td>{timeTag(profile.createdAt)}</td>
              <td>{timeTag(profile.updatedAt)}</td>
              <td>{truncate(profile.orgId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.profile({ id: profile.id })}
                    title={'Show profile ' + profile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProfile({ id: profile.id })}
                    title={'Edit profile ' + profile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete profile ' + profile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(profile.id)}
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

export default ProfilesList
