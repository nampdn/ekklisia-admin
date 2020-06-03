import AttendancesLayout from 'src/layouts/AttendancesLayout'
import AttendanceCell from 'src/components/AttendanceCell'

const AttendancePage = ({ id }) => {
  return (
    <AttendancesLayout>
      <AttendanceCell id={id} />
    </AttendancesLayout>
  )
}

export default AttendancePage
