import { db } from 'src/lib/db'

export const schedules = () => {
  return db.schedule.findMany()
}

export const schedule = ({ id }) => {
  return db.schedule.findOne({
    where: { id },
  })
}

export const createSchedule = ({ input }) => {
  return db.schedule.create({
    data: input,
  })
}

export const updateSchedule = ({ id, input }) => {
  return db.schedule.update({
    data: input,
    where: { id },
  })
}

export const deleteSchedule = ({ id }) => {
  return db.schedule.delete({
    where: { id },
  })
}

export const Schedule = {
  attendances: (_obj, { root }) => db.schedule.findOne({ where: { id: root.id } }).attendances(),
  activity: (_obj, { root }) => db.schedule.findOne({ where: { id: root.id } }).activity(),
}
