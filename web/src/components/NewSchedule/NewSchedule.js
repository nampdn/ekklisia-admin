import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ScheduleForm from 'src/components/ScheduleForm'

const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateScheduleMutation($input: CreateScheduleInput!) {
    createSchedule(input: $input) {
      id
    }
  }
`

const NewSchedule = () => {
  const [createSchedule, { loading, error }] = useMutation(CREATE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      navigate(routes.schedules())
    },
  })

  const onSave = (input) => {
    createSchedule({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Schedule</h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSchedule
