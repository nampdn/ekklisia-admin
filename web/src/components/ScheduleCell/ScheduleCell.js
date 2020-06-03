import Schedule from 'src/components/Schedule'

export const QUERY = gql`
  query FIND_SCHEDULE_BY_ID($id: String!) {
    schedule: schedule(id: $id) {
      id
      date
      activityId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Schedule not found</div>

export const Success = ({ schedule }) => {
  return <Schedule schedule={schedule} />
}
