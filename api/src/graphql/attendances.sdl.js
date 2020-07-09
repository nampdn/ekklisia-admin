export const schema = gql`
  type Attendance {
    id: String!
    slug: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    group: Group!
    schedule: Schedule!
    attendees: [Profile]
    absentees: [Profile]
    groupId: String!
    scheduleId: String!
  }

  type Query {
    attendances: [Attendance!]!
    attendance(id: String!): Attendance!
  }

  input BulkCreateAttendancesInput {
    groupId: String!
    scheduleId: String!
    attendees: [String!]
    absentees: [String!]
  }

  input CreateAttendanceInput {
    slug: String!
    status: String
    updatedAt: DateTime
    groupId: String!
    scheduleId: String!
  }

  input UpdateAttendanceInput {
    slug: String
    status: String
    updatedAt: DateTime
    groupId: String
    scheduleId: String
  }

  type Mutation {
    bulkCreateAttendances(input: BulkCreateAttendancesInput!): Attendance!
    createAttendance(input: CreateAttendanceInput!): Attendance!
    updateAttendance(id: String!, input: UpdateAttendanceInput!): Attendance!
    deleteAttendance(id: String!): Attendance!
  }
`
