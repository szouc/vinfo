export const STAFF = 'staff'
export const DRIVER = 'driver'
export const CAPTAIN = 'captain'
export const ACCOUNT = 'account'
export const MANAGER = 'manager'
export const ADMIN = 'admin'
export const MALE = 'male'
export const FEMALE = 'female'

export const DRIVER_PERMISSIONS = [DRIVER, CAPTAIN, ACCOUNT, MANAGER, ADMIN]
export const DRIVER_ACCOUNT_PERMISSIONS = [DRIVER, ACCOUNT, MANAGER, ADMIN]
export const DRIVER_CAPTAIN_PERMISSIONS = [DRIVER, CAPTAIN, MANAGER, ADMIN]
export const CAPTAIN_PERMISSIONS = [CAPTAIN, MANAGER, ADMIN]
export const ACCOUNT_PERMISSIONS = [ACCOUNT, MANAGER, ADMIN]
export const MANAGER_PERMISSIONS = [MANAGER, ADMIN]
