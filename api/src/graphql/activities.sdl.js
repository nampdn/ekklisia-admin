export const schema = gql`
  type Activity {
    id: String!
    slug: String!
    name: String!
    color: String
    org: Org!
    orgId: String!
    Schedule: Schedule
  }

  type Query {
    activities: [Activity!]!
    activity(id: String!): Activity!
  }

  input CreateActivityInput {
    slug: String!
    name: String!
    color: String
    orgId: String
  }

  input UpdateActivityInput {
    slug: String
    name: String
    color: String
    orgId: String
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity!
    updateActivity(id: String!, input: UpdateActivityInput!): Activity!
    deleteActivity(id: String!): Activity!
  }
`
