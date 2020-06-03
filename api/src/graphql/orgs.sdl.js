export const schema = gql`
  type Org {
    id: String!
    name: String!
    groups: Group
    activities: Activity
    Profile: Profile
  }

  type Query {
    orgs: [Org!]!
    org(id: String!): Org!
  }

  input CreateOrgInput {
    name: String!
  }

  input UpdateOrgInput {
    name: String
  }

  type Mutation {
    createOrg(input: CreateOrgInput!): Org!
    updateOrg(id: String!, input: UpdateOrgInput!): Org!
    deleteOrg(id: String!): Org!
  }
`
