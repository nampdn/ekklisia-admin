import { Link, routes } from '@redwoodjs/router'

import Orgs from 'src/components/Orgs'

export const QUERY = gql`
  query ORGS {
    orgs {
      id
      name
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
      {'No orgs yet. '}
      <Link
        to={routes.newOrg()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ orgs }) => {
  return <Orgs orgs={orgs} />
}
