import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import GroupForm from 'src/components/GroupForm'

export const QUERY = gql`
  query FIND_GROUP_BY_ID($id: String!) {
    group: group(id: $id) {
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
const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($id: String!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ group }) => {
  const [updateGroup, { loading, error }] = useMutation(UPDATE_GROUP_MUTATION, {
    onCompleted: () => {
      navigate(routes.groups())
    },
  })

  const onSave = (input, id) => {
    updateGroup({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Group {group.id}</h2>
      </header>
      <div className="rw-segment-main">
        <GroupForm group={group} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
