import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AttendanceForm from 'src/components/AttendanceForm'

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
const UPDATE_ATTENDANCE_MUTATION = gql`
  mutation UpdateAttendanceMutation($id: String!, $input: UpdateAttendanceInput!) {
    updateAttendance(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ attendance }) => {
  const [updateAttendance, { loading, error }] = useMutation(UPDATE_ATTENDANCE_MUTATION, {
    onCompleted: () => {
      navigate(routes.attendances())
    },
  })

  const onSave = (input, id) => {
    updateAttendance({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Attendance {attendance.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AttendanceForm attendance={attendance} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
