export const schema = gql`
  type Group {
    id: String!
    name: String!
    slug: String
    year: Int
    stage: String
    members: Profile
    startAt: DateTime
    endAt: DateTime
    createdAt: DateTime
    updatedAt: DateTime
    leader: Profile
    leaderId: String
    Org: Org
    orgId: String
    attendances: Attendance
  }

  type Query {
    groups: [Group!]!
    group(id: String!): Group!
  }

  input CreateGroupInput {
    name: String!
    slug: String
    year: Int
    stage: String
    startAt: DateTime
    endAt: DateTime
    updatedAt: DateTime
    leaderId: String
    orgId: String
  }

  input UpdateGroupInput {
    name: String
    slug: String
    year: Int
    stage: String
    startAt: DateTime
    endAt: DateTime
    updatedAt: DateTime
    leaderId: String
    orgId: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group!
    updateGroup(id: String!, input: UpdateGroupInput!): Group!
    deleteGroup(id: String!): Group!
  }
`
