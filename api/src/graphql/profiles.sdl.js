export const schema = gql`
  type Profile {
    id: String!
    fullName: String!
    gender: String
    oldId: String
    slug: String
    email: String
    facebookId: String
    phoneNumber: String
    birthday: DateTime
    joinDate: DateTime
    dayOfBirth: Int
    monthOfBirth: Int
    yearOfBirth: Int
    org: Org
    createdAt: DateTime!
    updatedAt: DateTime!
    leader: Group
    member: Group
    attendee: Attendance
    absentee: Attendance
    orgId: String
    user: User
  }

  type Query {
    profiles: [Profile!]!
    profile(id: String!): Profile!
  }

  input CreateProfileInput {
    id: String
    fullName: String!
    gender: String
    oldId: String
    slug: String
    email: String
    facebookId: String
    phoneNumber: String
    birthday: DateTime
    joinDate: DateTime
    dayOfBirth: Int
    monthOfBirth: Int
    yearOfBirth: Int
    orgId: String
  }

  input UpdateProfileInput {
    fullName: String
    gender: String
    oldId: String
    slug: String
    email: String
    facebookId: String
    phoneNumber: String
    birthday: DateTime
    joinDate: DateTime
    dayOfBirth: Int
    monthOfBirth: Int
    yearOfBirth: Int
    orgId: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile!
    updateProfile(id: String!, input: UpdateProfileInput!): Profile!
    deleteProfile(id: String!): Profile!
  }
`
