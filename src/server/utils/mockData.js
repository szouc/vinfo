import Mock from 'mockjs'

import { DRIVER, CAPTAIN, ACCOUNTANT, MANAGER } from '../modules/user/constants'

const driverTemplate = {
  username: () => Mock.Random.natural(10000, 99999),
  password: '123',
  fullname: () => Mock.Random.cname(),
  gender: 'male',
  role: DRIVER
}

const managerTemplate = {
  ...driverTemplate,
  role: MANAGER
}

const captainTemplate = {
  ...driverTemplate,
  role: CAPTAIN
}

const accountantTemplate = {
  ...driverTemplate,
  role: ACCOUNTANT
}

const companyTemplate = {
  name: () => Mock.Random.string('upper', 10),
  addr: () => Mock.Random.string('lower', 20)
}

const productTemplate = {
  name: () => Mock.Random.string('upper', 10),
  specs: () => Mock.Random.string('lower', 10),
  pricing: () => Mock.Random.natural(300, 500)
}

const priceHistoryTemplate = {
  price: () => Mock.Random.natural(300, 500),
  start: () => Mock.Random.date(),
  end: () => Mock.Random.date()
}

const vehicleTemplate = {
  plate: () => Mock.Random.string('upper', 7),
  engine: () => Mock.Random.string('number', 7),
  model: () => Mock.Random.string('lower', 7)
}

const fuelTemplate = {
  litre: () => Mock.Random.natural(30, 50),
  cost: () => Mock.Random.natural(100, 500),
  mile: () => Mock.Random.natural(12345, 34352)
}

const maintainTemplate = {
  reason: () => Mock.Random.string('lower', 50),
  cost: () => Mock.Random.natural(100, 500),
  mile: () => Mock.Random.natural(12345, 34352)
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
  'companies|5': [companyTemplate]
})

export { data }
