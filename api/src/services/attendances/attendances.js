import { db } from 'src/lib/db'

export const attendances = () => {
  return db.attendance.findMany()
}

export const attendance = ({ id }) => {
  return db.attendance.findOne({
    where: { id },
  })
}

export const createAttendance = ({ input }) => {
  return db.attendance.create({
    data: input,
  })
}

export const updateAttendance = ({ id, input }) => {
  return db.attendance.update({
    data: input,
    where: { id },
  })
}

export const deleteAttendance = ({ id }) => {
  return db.attendance.delete({
    where: { id },
  })
}

export const Attendance = {
  group: (_obj, { root }) => db.attendance.findOne({ where: { id: root.id } }).group(),
  schedule: (_obj, { root }) => db.attendance.findOne({ where: { id: root.id } }).schedule(),
  profiles: (_obj, { root }) => db.attendance.findOne({ where: { id: root.id } }).profiles(),
  profiles: (_obj, { root }) => db.attendance.findOne({ where: { id: root.id } }).profiles(),
}