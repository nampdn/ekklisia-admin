import { Link, routes } from '@redwoodjs/router'

import Attendances from 'src/components/Attendances'

export const QUERY = gql`
  query ATTENDANCES {
    attendances {
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

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No attendances yet. '}
      <Link
        to={routes.newAttendance()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ attendances }) => {
  return <Attendances attendances={attendances} />
}
