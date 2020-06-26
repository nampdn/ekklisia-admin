export const remapRelationFields = (input, fields) => {
  let connect = {}
  for (let prop in fields) {
    if (prop in input) {
      if (typeof fields[prop] == 'string') {
        connect[fields[prop]] = {
          connect: {
            id: input[prop],
          },
        }
      } else if ('map' in fields[prop]) {
        const mappedValue = fields[prop].map(input[prop])
        if (mappedValue && mappedValue.length > 0) {
          connect[fields[prop].field] = {
            connect: mappedValue,
          }
        } else {
          connect[fields[prop].field] = {
            connect: {
              [fields[prop].reference]: mappedValue,
            },
          }
        }
      }
      delete input[prop]
    }
  }
  input = { ...input, ...connect }
  return input
}

export const remapFields = (input, fields) => {
  const newInput = {}
  for (let prop in fields) {
    if (prop in input) {
      newInput[prop] = fields[prop](input[prop])
    }
  }
  return { ...input, ...newInput }
}
