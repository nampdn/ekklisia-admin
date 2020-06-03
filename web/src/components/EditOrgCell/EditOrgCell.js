import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import OrgForm from 'src/components/OrgForm'

export const QUERY = gql`
  query FIND_ORG_BY_ID($id: String!) {
    org: org(id: $id) {
      id
      name
    }
  }
`
const UPDATE_ORG_MUTATION = gql`
  mutation UpdateOrgMutation($id: String!, $input: UpdateOrgInput!) {
    updateOrg(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ org }) => {
  const [updateOrg, { loading, error }] = useMutation(UPDATE_ORG_MUTATION, {
    onCompleted: () => {
      navigate(routes.orgs())
    },
  })

  const onSave = (input, id) => {
    updateOrg({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Org {org.id}</h2>
      </header>
      <div className="rw-segment-main">
        <OrgForm org={org} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
