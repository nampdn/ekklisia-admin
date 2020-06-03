import Org from 'src/components/Org'

export const QUERY = gql`
  query FIND_ORG_BY_ID($id: String!) {
    org: org(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Org not found</div>

export const Success = ({ org }) => {
  return <Org org={org} />
}
