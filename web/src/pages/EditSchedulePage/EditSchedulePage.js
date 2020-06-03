import SchedulesLayout from 'src/layouts/SchedulesLayout'
import EditScheduleCell from 'src/components/EditScheduleCell'

const EditSchedulePage = ({ id }) => {
  return (
    <SchedulesLayout>
      <EditScheduleCell id={id} />
    </SchedulesLayout>
  )
}

export default EditSchedulePage
