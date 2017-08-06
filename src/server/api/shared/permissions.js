import indexOf from 'lodash.indexof'
// middleware for doing role-based permissions
export default function permit (allowedArray) {
  let isAllowed = (role) => indexOf(allowedArray, role) > -1

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      next()
    } else {
      res.status(403).json({message: 'Forbidden'})
    }
  }
}

export const isOwner = (req, res, next) => {
  if (req.user && req.user.username === req.params.username) {
    next()
  } else {
    res.status(403).json({message: 'Wrong User'})
  }
}
