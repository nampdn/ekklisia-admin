import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ScheduleForm from 'src/components/ScheduleForm'

export const QUERY = gql`
  query FIND_SCHEDULE_BY_ID($id: String!) {
    schedule: schedule(id: $id) {
      id
      date
      activityId
    }
  }
`
const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateScheduleMutation($id: String!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ schedule }) => {
  const [updateSchedule, { loading, error }] = useMutation(UPDATE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      navigate(routes.schedules())
    },
  })

  const onSave = (input, id) => {
    updateSchedule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Schedule {schedule.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm schedule={schedule} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
