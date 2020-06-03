import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import ProfileForm from 'src/components/ProfileForm'

export const QUERY = gql`
  query FIND_PROFILE_BY_ID($id: String!) {
    profile: profile(id: $id) {
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
const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileMutation($id: String!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ profile }) => {
  const [updateProfile, { loading, error }] = useMutation(UPDATE_PROFILE_MUTATION, {
    onCompleted: () => {
      navigate(routes.profiles())
    },
  })

  const onSave = (input, id) => {
    updateProfile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Profile {profile.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ProfileForm profile={profile} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
