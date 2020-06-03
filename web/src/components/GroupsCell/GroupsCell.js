import { Link, routes } from '@redwoodjs/router'

import Groups from 'src/components/Groups'

export const QUERY = gql`
  query GROUPS {
    groups {
      id
      name
      slug
      year
      stage
      startAt
      endAt
      createdAt
      updatedAt
      leaderId
      orgId
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
      {'No groups yet. '}
      <Link
        to={routes.newGroup()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ groups }) => {
  return <Groups groups={groups} />
}
