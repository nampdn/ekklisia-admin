import { Link, routes } from '@redwoodjs/router'

import Activities from 'src/components/Activities'

export const QUERY = gql`
  query ACTIVITIES {
    activities {
      id
      slug
      name
      color
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
      {'No activities yet. '}
      <Link
        to={routes.newActivity()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ activities }) => {
  return <Activities activities={activities} />
}
