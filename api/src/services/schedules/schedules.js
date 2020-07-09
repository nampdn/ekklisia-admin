import { db } from 'src/lib/db'
import { remapRelationFields, remapFields } from 'src/lib/helpers'

export const schedules = () => {
  return db.schedule.findMany()
}

export const schedule = ({ id }) => {
  return db.schedule.findOne({
    where: { id },
  })
}

export const createSchedule = ({ input }) => {
  const patchedInput = remapRelationFields(input, {
    activityId: {
      field: 'activity',
      map: (slug) => ({ slug }),
    },
  })
  if (!patchedInput.id) {
    return db.schedule.create({
      data: input,
    })
  } else {
    return db.schedule.upsert({
      where: { id: patchedInput.id },
      create: patchedInput,
      update: patchedInput,
    })
  }
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
  attendances: (_obj, { root }) =>
    db.schedule.findOne({ where: { id: root.id } }).attendances(),
  activity: (_obj, { root }) =>
    db.schedule.findOne({ where: { id: root.id } }).activity(),
}
