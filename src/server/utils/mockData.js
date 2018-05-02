import Mock from 'mockjs'

import { DRIVER, CAPTAIN, ACCOUNTANT, MANAGER } from '../modules/user/constants'

const driverTemplate = {
  // username: () => String(Mock.Random.natural(10000, 99999)),
  username: '@string("number", 5, 10)',
  password: '123',
  // fullname: () => Mock.Random.cname(),
  fullname: '@cname',
  phone: '@natural(13000000000, 17299999999)',
  gender: 'male',
  role: DRIVER
}

// const driverEntity = {
//   username: '@string("number", 5, 10)',
//   password: '123',
//   fullname: '@cname',
//   phone: '@natural(13000000000, 17299999999)',
//   gender: 'male',
//   createdAt: '@date',
//   active: true,
//   role: DRIVER
// }

const managerTemplate = {
  ...driverTemplate,
  role: MANAGER
}

// const managerEntity = {
//   ...driverEntity,
//   role: MANAGER
// }

const captainTemplate = {
  ...driverTemplate,
  role: CAPTAIN
}

// const captainEntity = {
//   ...driverEntity,
//   role: CAPTAIN
// }

const accountantTemplate = {
  ...driverTemplate,
  role: ACCOUNTANT
}

// const accountantEntity = {
//   ...driverEntity,
//   role: ACCOUNTANT
// }

const companyTemplate = {
  name: '@ctitle(5,10)',
  addr: '@county(true)',
  phone: '@natural(13000000000, 17299999999)',
  legalPerson: '@ctitle(5,10)',
  taxNumber: '@natural(10000,30000)'
}

// const companyEntity = {
//   ...companyTemplate,
//   _id: () => chance.hash({ length: 24 }),
//   createdAt: '@date',
//   active: true
// }

const priceHistoryTemplate = {
  price: '@natural(300, 500)',
  start: '@date()',
  end: '@date()'
}

// const priceHistoryEntity = {
//   ...priceHistoryTemplate,
//   _id: () => chance.hash({ length: 24 })
// }

const productTemplate = {
  name: '@ctitle(4)',
  specs: '@string("lower", 10)',
  pricing: '@natural(300, 500)'
}

// const productEntity = {
//   ...productTemplate,
//   _id: () => chance.hash({ length: 24 }),
//   createdAt: '@date',
//   active: true
// }

const fuelTemplate = {
  litre: '@natural(30, 50)',
  cost: '@natural(100, 500)',
  mile: '@natural(12345, 34352)',
  isCheck: false,
  info: '@cparagraph(2,5)'
}

// const fuelEntity = {
//   ...fuelTemplate,
//   _id: () => chance.hash({ length: 24 })
// }

const maintainTemplate = {
  reason: '@cparagraph(2,5)',
  cost: '@natural(100, 500)',
  mile: '@natural(12345, 34352)',
  date: '@date',
  isCheck: false,
  info: '@cparagraph(2,5)'
}

// const maintainEntity = {
//   ...maintainTemplate,
//   _id: () => chance.hash({ length: 24 })
// }

const vehicleTemplate = {
  plate: '@string("upper", 7)',
  engine: '@string("number", 11)',
  model: '@string("lower", 7)',
  purchaseDate: '@date',
  initMile: '@natural(100, 999)',
  assigned: false
}

// const vehicleEntity = {
//   ...vehicleTemplate,
//   _id: () => chance.hash({ length: 24 }),
//   createdAt: '@date',
//   active: true
// }

// const transportTemplate = {
//   assigner: captainEntity,
//   vehicle: vehicleEntity,
//   from: {
//     company: companyEntity
//   },
//   to: {
//     company: companyEntity
//   },
//   product: productEntity
// }

// const transportEntity = {
//   ...transportTemplate,
//   _id: () => chance.hash({ length: 24 })
// }

// function to create file from base64 encoded string
function base64Decode(base64Image) {
  const BASE64_MARKER = ';base64,'
  const parts = base64Image.split(BASE64_MARKER)
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  const bitmap = Buffer.from(parts[1], 'base64')
  return bitmap
}

const imageTemplate = {
  license: () => base64Decode(Mock.Random.dataImage('200x100', 'license')),
  idFront: () => base64Decode(Mock.Random.dataImage('200x100', 'idFront')),
  idBack: () => base64Decode(Mock.Random.dataImage('200x100', 'idBack'))
}

const data = Mock.mock({
  'managers|2': [managerTemplate],
  'drivers|5': [driverTemplate],
  'captains|5': [captainTemplate],
  'accountants|5': [accountantTemplate],
  'vehicles|5': [vehicleTemplate],
  'fuels|5': [fuelTemplate],
  'maintains|5': [maintainTemplate],
  'products|5': [productTemplate],
  'priceHistories|5': [priceHistoryTemplate],
  'companies|5': [companyTemplate],
  // 'transports|5': [transportTemplate],
  // 'managersData|2': [managerEntity],
  // 'driversData|5': [driverEntity],
  // 'captainsData|5': [captainEntity],
  // 'accountantsData|5': [accountantEntity],
  // 'vehiclesData|5': [vehicleEntity],
  // 'fuelsData|5': [fuelEntity],
  // 'maintainsData|5': [maintainEntity],
  // 'productsData|5': [productEntity],
  // 'priceHistoriesData|5': [priceHistoryEntity],
  // 'companiesData|5': [companyEntity],
  // 'transportsData|5': [transportEntity],
  'images|5': [imageTemplate]
})

export { data }
