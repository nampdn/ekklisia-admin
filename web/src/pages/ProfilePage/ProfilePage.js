import ProfilesLayout from 'src/layouts/ProfilesLayout'
import ProfileCell from 'src/components/ProfileCell'

const ProfilePage = ({ id }) => {
  return (
    <ProfilesLayout>
      <ProfileCell id={id} />
    </ProfilesLayout>
  )
}

export default ProfilePage
