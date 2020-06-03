import { db } from 'src/lib/db'

export const groups = () => {
  return db.group.findMany()
}

export const group = ({ id }) => {
  return db.group.findOne({
    where: { id },
  })
}

export const createGroup = ({ input }) => {
  return db.group.create({
    data: input,
  })
}

export const updateGroup = ({ id, input }) => {
  return db.group.update({
    data: input,
    where: { id },
  })
}

export const deleteGroup = ({ id }) => {
  return db.group.delete({
    where: { id },
  })
}

export const Group = {
  profiles: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).profiles(),
  profile: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).profile(),
  org: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).org(),
  attendances: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).attendances(),
  groupEnrollments: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).groupEnrollments(),
}
