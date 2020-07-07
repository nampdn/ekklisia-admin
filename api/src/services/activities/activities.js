import { db } from 'src/lib/db'
import { remapRelationFields, remapFields } from 'src/lib/helpers'

export const activities = () => {
  return db.activity.findMany()
}

export const activity = ({ id }) => {
  return db.activity.findOne({
    where: { id },
  })
}

export const createActivity = async ({ input }) => {
  const org = await db.org.findMany({})
  input.org = {connect: {id: org[0].id}}
// const patchedInput = remapRelationFields(input, {
// })
  return db.activity.upsert({
    where: {slug: input.slug},
    create: input,
    update: input
  })
}

export const updateActivity = ({ id, input }) => {
  return db.activity.update({
    data: input,
    where: { id },
  })
}

export const deleteActivity = ({ id }) => {
  return db.activity.delete({
    where: { id },
  })
}

export const Activity = {
  org: (_obj, { root }) => db.activity.findOne({ where: { id: root.id } }).org(),
  schedules: (_obj, { root }) => db.activity.findOne({ where: { id: root.id } }).schedules(),
}
