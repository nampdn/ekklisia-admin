import SchedulesLayout from 'src/layouts/SchedulesLayout'
import ScheduleCell from 'src/components/ScheduleCell'

const SchedulePage = ({ id }) => {
  return (
    <SchedulesLayout>
      <ScheduleCell id={id} />
    </SchedulesLayout>
  )
}

export default SchedulePage
