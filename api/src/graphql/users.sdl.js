export const schema = gql`
  type User {
    id: String!
    email: String!
    password: String!
    permission: Int!
    name: String
    profile: Profile!
    profileId: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User!
  }

  input CreateUserInput {
    email: String!
    password: String!
    permission: Int!
    name: String
    profileId: String!
  }

  input UpdateUserInput {
    email: String
    password: String
    permission: Int
    name: String
    profileId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): User!
  }
`
