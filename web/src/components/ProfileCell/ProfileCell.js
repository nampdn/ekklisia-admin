import Profile from 'src/components/Profile'

export const QUERY = gql`
  query FIND_PROFILE_BY_ID($id: String!) {
    profile: profile(id: $id) {
      id
      fullName
      gender
      slug
      email
      facebookId
      phoneNumber
      birthday
      joinDate
      dayOfBirth
      monthOfBirth
      yearOfBirth
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Profile not found</div>

export const Success = ({ profile }) => {
  return <Profile profile={profile} />
}
