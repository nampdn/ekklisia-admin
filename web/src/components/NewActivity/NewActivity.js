import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ActivityForm from 'src/components/ActivityForm'

const CREATE_ACTIVITY_MUTATION = gql`
  mutation CreateActivityMutation($input: CreateActivityInput!) {
    createActivity(input: $input) {
      id
    }
  }
`

const NewActivity = () => {
  const [createActivity, { loading, error }] = useMutation(CREATE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      navigate(routes.activities())
    },
  })

  const onSave = (input) => {
    createActivity({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Activity</h2>
      </header>
      <div className="rw-segment-main">
        <ActivityForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewActivity
