module.exports = {
  testEnvironment: 'node',
  bail: true,
  verbose: true,
  roots: [
    '<rootDir>/src/server/auth',
    '<rootDir>/src/server/modules/user',
    '<rootDir>/src/server/modules/company',
    '<rootDir>/src/server/modules/product',
    '<rootDir>/src/server/modules/vehicle',
    '<rootDir>/src/server/modules/transport',
    '<rootDir>/src/server/modules/driver',
    '<rootDir>/src/server/modules/captain'
  ]
}
