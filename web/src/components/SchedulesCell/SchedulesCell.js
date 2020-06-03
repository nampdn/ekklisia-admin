import { Link, routes } from '@redwoodjs/router'

import Schedules from 'src/components/Schedules'

export const QUERY = gql`
  query SCHEDULES {
    schedules {
      id
      date
      activityId
    }
  }
`

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No schedules yet. '}
      <Link
        to={routes.newSchedule()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ schedules }) => {
  return <Schedules schedules={schedules} />
}
