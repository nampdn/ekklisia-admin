import { db } from 'src/lib/db'

export const orgs = () => {
  return db.org.findMany()
}

export const org = ({ id }) => {
  return db.org.findOne({
    where: { id },
  })
}

export const createOrg = ({ input }) => {
  return db.org.create({
    data: input,
  })
}

export const updateOrg = ({ id, input }) => {
  return db.org.update({
    data: input,
    where: { id },
  })
}

export const deleteOrg = ({ id }) => {
  return db.org.delete({
    where: { id },
  })
}

export const Org = {
  groups: (_obj, { root }) =>
    db.org.findOne({ where: { id: root.id } }).groups(),
  activities: (_obj, { root }) =>
    db.org.findOne({ where: { id: root.id } }).activities(),
  profiles: (_obj, { root }) =>
    db.org.findOne({ where: { id: root.id } }).profiles(),
}
