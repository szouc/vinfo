import {
  DRIVER,
  CAPTAIN,
  ACCOUNTANT,
  MANAGER,
  ADMIN
} from '../modules/user/constants'

const DRIVER_PERMISSIONS = [DRIVER, CAPTAIN, ACCOUNTANT, MANAGER, ADMIN]
// const DRIVER_ACCOUNT_PERMISSIONS = [DRIVER, ACCOUNT, MANAGER, ADMIN]
// const DRIVER_CAPTAIN_PERMISSIONS = [DRIVER, CAPTAIN, MANAGER, ADMIN]
const CAPTAIN_PERMISSIONS = [CAPTAIN, MANAGER, ADMIN]
const ACCOUNTANT_PERMISSIONS = [ACCOUNTANT, MANAGER, ADMIN]
const MANAGER_PERMISSIONS = [MANAGER, ADMIN]

const isOwner = (req, res, next) => {
  if (
    req.user &&
    req.user.active &&
    req.user.username === req.params.username
  ) {
    next()
  } else {
    res.status(403).json({ message: '用户错误' })
  }
}

// middleware for doing role-based permissions
const permit = allowedArray => {
  let isAllowed = (role) => allowedArray.includes(role)

  return (req, res, next) => {
    if (req.user && req.user.active && isAllowed(req.user.role)) {
      next()
    } else {
      res.status(403).json({ message: '无权访问' })
    }
  }
}

const permitManager = permit(MANAGER_PERMISSIONS)
const permitDriver = permit(DRIVER_PERMISSIONS)
const permitCaptain = permit(CAPTAIN_PERMISSIONS)
const permitAccountant = permit(ACCOUNTANT_PERMISSIONS)

export { permitManager, permitDriver, permitCaptain, permitAccountant, isOwner }
