import Attendance from 'src/components/Attendance'

export const QUERY = gql`
  query FIND_ATTENDANCE_BY_ID($id: String!) {
    attendance: attendance(id: $id) {
      id
      slug
      status
      createdAt
      updatedAt
      groupId
      scheduleId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Attendance not found</div>

export const Success = ({ attendance }) => {
  return <Attendance attendance={attendance} />
}
