import GroupsLayout from 'src/layouts/GroupsLayout'
import EditGroupCell from 'src/components/EditGroupCell'

const EditGroupPage = ({ id }) => {
  return (
    <GroupsLayout>
      <EditGroupCell id={id} />
    </GroupsLayout>
  )
}

export default EditGroupPage
