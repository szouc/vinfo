import {
  STAFF,
  DRIVER,
  CAPTAIN,
  ACCOUNTANT,
  MANAGER,
  ADMIN,
  MALE,
  FEMALE
} from '@server/modules/user/constants'

export const genderMapper = {
  [MALE]: '男',
  [FEMALE]: '女'
}

export const roleMapper = {
  [STAFF]: '职工',
  [DRIVER]: '司机',
  [CAPTAIN]: '队长',
  [ACCOUNTANT]: '会计',
  [MANAGER]: '经理',
  [ADMIN]: '管理员'
}

export { STAFF, DRIVER, CAPTAIN, ACCOUNTANT, MANAGER, ADMIN, MALE, FEMALE }
