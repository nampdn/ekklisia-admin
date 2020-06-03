import Activity from 'src/components/Activity'

export const QUERY = gql`
  query FIND_ACTIVITY_BY_ID($id: String!) {
    activity: activity(id: $id) {
      id
      slug
      name
      color
      orgId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Activity not found</div>

export const Success = ({ activity }) => {
  return <Activity activity={activity} />
}
