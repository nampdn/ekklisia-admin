import { db } from 'src/lib/db'
import { remapRelationFields, remapFields } from 'src/lib/helpers'

export const groups = () => {
  return db.group.findMany({ orderBy: { name: 'asc' } })
}

export const group = ({ id }) => {
  return db.group.findOne({
    where: { id },
  })
}

export const createGroup = ({ input }) => {
  const patchedInput = remapRelationFields(input, {
    orgId: 'org',
    leaderId: 'leader',
    members: {
      field: 'members',
      reference: 'id',
      map: (data) => JSON.parse(data),
    },
  })
  return db.group.upsert({
    where: { id: patchedInput.id },
    create: patchedInput,
    update: patchedInput,
  })
}

export const updateGroup = ({ id, input }) => {
  const patchedInput = remapFields(input, {
    year: (x) => parseInt(x),
  })
  return db.group.update({
    data: patchedInput,
    where: { id },
  })
}

export const deleteGroup = ({ id }) => {
  return db.group.delete({
    where: { id },
  })
}

export const upsertGroup = ({ id, input }) => {
  return db.group.upsert({
    where: { id },
    data: input,
  })
}

export const Group = {
  members: (_obj, { root }) =>
    db.group.findOne({ where: { id: root.id } }).members(),
  leader: (_obj, { root }) =>
    db.group.findOne({ where: { id: root.id } }).leader(),
  org: (_obj, { root }) => db.group.findOne({ where: { id: root.id } }).org(),
  attendances: (_obj, { root }) =>
    db.group.findOne({ where: { id: root.id } }).attendances(),
  groupEnrollments: (_obj, { root }) =>
    db.group.findOne({ where: { id: root.id } }).groupEnrollments(),
}
