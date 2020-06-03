import { Link, routes } from '@redwoodjs/router'

import Profiles from 'src/components/Profiles'

export const QUERY = gql`
  query PROFILES {
    profiles {
      id
      fullName
      gender
      oldId
      slug
      email
      facebookId
      phoneNumber
      birthday
      joinDate
      dayOfBirth
      monthOfBirth
      yearOfBirth
      createdAt
      updatedAt
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
      {'No profiles yet. '}
      <Link
        to={routes.newProfile()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ profiles }) => {
  return <Profiles profiles={profiles} />
}
