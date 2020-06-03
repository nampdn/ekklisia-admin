import Group from 'src/components/Group'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Group not found</div>

export const Success = ({ group }) => {
  return <Group group={group} />
}
