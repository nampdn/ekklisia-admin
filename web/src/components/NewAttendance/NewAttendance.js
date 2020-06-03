import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import AttendanceForm from 'src/components/AttendanceForm'

const CREATE_ATTENDANCE_MUTATION = gql`
  mutation CreateAttendanceMutation($input: CreateAttendanceInput!) {
    createAttendance(input: $input) {
      id
    }
  }
`

const NewAttendance = () => {
  const [createAttendance, { loading, error }] = useMutation(CREATE_ATTENDANCE_MUTATION, {
    onCompleted: () => {
      navigate(routes.attendances())
    },
  })

  const onSave = (input) => {
    createAttendance({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Attendance</h2>
      </header>
      <div className="rw-segment-main">
        <AttendanceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAttendance
