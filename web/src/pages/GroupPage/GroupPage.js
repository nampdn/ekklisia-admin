import GroupsLayout from 'src/layouts/GroupsLayout'
import GroupCell from 'src/components/GroupCell'

const GroupPage = ({ id }) => {
  return (
    <GroupsLayout>
      <GroupCell id={id} />
    </GroupsLayout>
  )
}

export default GroupPage
