import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import * as dayjs from 'dayjs'
import 'dayjs/locale/vi' // load on demand

dayjs.locale('vi');

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

const buildAvatarUrl = (id, fid) =>
    fid
      ? `https://graph.facebook.com/v6.0/${fid}/picture`
      : `https://api.adorable.io/avatars/285/${id}.png`


const ProfilesList = ({ profiles }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id }, refetchQueries: ['PROFILES'] })
    }
  }

  console.log(dayjs, profiles);

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Liên hệ</th>
            <th>Sinh nhật</th>
            <th>Ngày vào</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>
                <div class="flex overflow-hidden">
                  <img
                    class="inline-block h-6 w-6 rounded-full text-white shadow-solid"
                    src={buildAvatarUrl(profile.id, profile.facebookId)} alt="" />
                  <span class="pl-4">{truncate(profile.fullName)}</span>
                </div>
              </td>
              <td>{truncate(profile.gender)}</td>
              <td>{truncate(profile.phoneNumber)}</td>
              <td>{profile.birthday ? dayjs(profile.birthday).format("DD/MM/YYYY") : null}</td>
              <td>{profile.joinDate ? dayjs(profile.joinDate).format("DD/MM/YYYY") : null}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.profile({ id: profile.id })}
                    title={'Xem hồ sơ ' + profile.fullName}
                    className="rw-button rw-button-small"
                  >
                    Xem
                  </Link>
                  <Link
                    to={routes.editProfile({ id: profile.id })}
                    title={'Sửa hồ sơ ' + profile.fullName}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Sửa
                  </Link>
                  <a
                    href="#"
                    title={'Xóa hồ sơ ' + profile.fullName}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(profile.id)}
                  >
                    Xóa
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
