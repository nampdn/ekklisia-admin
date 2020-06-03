import ProfilesLayout from 'src/layouts/ProfilesLayout'
import EditProfileCell from 'src/components/EditProfileCell'

const EditProfilePage = ({ id }) => {
  return (
    <ProfilesLayout>
      <EditProfileCell id={id} />
    </ProfilesLayout>
  )
}

export default EditProfilePage
