import AttendancesLayout from 'src/layouts/AttendancesLayout'
import EditAttendanceCell from 'src/components/EditAttendanceCell'

const EditAttendancePage = ({ id }) => {
  return (
    <AttendancesLayout>
      <EditAttendanceCell id={id} />
    </AttendancesLayout>
  )
}

export default EditAttendancePage
