import { differenceWith, isEqual } from 'lodash'

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

export const bulkCreateAttendances = async ({ input }) => {
  console.log(input)
  const { scheduleId, groupId, attendees, absentees } = input
  const schedule = await db.schedule.findOne({
    where: { id: scheduleId },
  })
  if (!schedule)
    throw new Error(
      'Không tìm thấy lịch cho phần điểm danh này, vui lòng kiểm tra lại!'
    )

  const slug = `${schedule.id}$${groupId}`
  const data = {
    slug,
    group: { connect: { id: groupId } },
    schedule: { connect: { id: schedule.id } },
    status: 'done',
  }
  if (attendees && attendees.length)
    data.attendees = {
      connect: attendees.map((id) => ({ id })),
    }
  if (absentees && absentees.length)
    data.absentees = {
      connect: absentees.map((id) => ({ id })),
    }

  // Check for last value and disconnect the updated one
  const existAttendance = await db.attendance.findOne({
    where: { slug },
    select: { attendees: true, absentees: true },
  })
  if (existAttendance) {
    const existAttendees = existAttendance.attendees.map(({ id }) => ({
      id,
    }))
    const existAbsentees = existAttendance.absentees.map(({ id }) => ({
      id,
    }))
    const disconnectOldAttendance = {
      where: { slug },
      data: {
        attendees: {
          disconnect: differenceWith(
            existAttendees,
            data.attendees ? data.attendees.connect : [],
            isEqual
          ),
        },
        absentees: {
          disconnect: differenceWith(
            existAbsentees,
            data.absentees ? data.absentees.connect : [],
            isEqual
          ),
        },
      },
    }
    if (disconnectOldAttendance.data.attendees.disconnect.length === 0) {
      delete disconnectOldAttendance.data.attendees
    }
    if (disconnectOldAttendance.data.absentees.disconnect.length === 0) {
      delete disconnectOldAttendance.data.absentees
    }
    await db.attendance.update(disconnectOldAttendance)
  }

  console.log(`Upserted attendances ${slug}`)

  return await db.attendance.upsert({
    where: { slug },
    create: data,
    update: data,
  })
}

export const Attendance = {
  group: (_obj, { root }) =>
    db.attendance.findOne({ where: { id: root.id } }).group(),
  schedule: (_obj, { root }) =>
    db.attendance.findOne({ where: { id: root.id } }).schedule(),
  profiles: (_obj, { root }) =>
    db.attendance.findOne({ where: { id: root.id } }).profiles(),
  attendees: (_obj, { root }) =>
    db.attendance.findOne({ where: { id: root.id } }).attendees(),
  absentees: (_obj, { root }) =>
    db.attendance.findOne({ where: { id: root.id } }).absentees(),
}
