export const schema = gql`
  type Schedule {
    id: String!
    attendances: Attendance
    date: DateTime!
    activity: Activity!
    activityId: String!
  }

  type Query {
    schedules: [Schedule!]!
    schedule(id: String!): Schedule!
  }

  input CreateScheduleInput {
    date: DateTime!
    activityId: String!
  }

  input UpdateScheduleInput {
    date: DateTime
    activityId: String
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule!
    updateSchedule(id: String!, input: UpdateScheduleInput!): Schedule!
    deleteSchedule(id: String!): Schedule!
  }
`
