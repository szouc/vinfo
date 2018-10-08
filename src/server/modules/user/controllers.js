// @ flow

import { ROLES } from './constants'
import * as Service from './services'
import { uploadImage, getImageUrl } from '../shared/uploadImage'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const LICENSE_UPLOAD_FIELD = 'detail.license'
const LICENSE_UPLOAD_PATH = 'license'
const ID_FRONT_UPLOAD_FIELD = 'detail.idFront'
const ID_FRONT_UPLOAD_PATH = 'id_front'
const ID_BACK_UPLOAD_FIELD = 'detail.idBack'
const ID_BACK_UPLOAD_PATH = 'id_back'

const uploadLicense = uploadImage(LICENSE_UPLOAD_FIELD, LICENSE_UPLOAD_PATH)
const uploadIdFront = uploadImage(ID_FRONT_UPLOAD_FIELD, ID_FRONT_UPLOAD_PATH)
const uploadIdBack = uploadImage(ID_BACK_UPLOAD_FIELD, ID_BACK_UPLOAD_PATH)

const getLicenseUrl = getImageUrl(LICENSE_UPLOAD_PATH)
const getIdFrontUrl = getImageUrl(ID_FRONT_UPLOAD_PATH)
const getIdBackUrl = getImageUrl(ID_BACK_UPLOAD_PATH)

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(200).json({ ok: false, error: errHint })
    }
    if (data.doc) {
      if (data.doc.length === 0) {
        return res.status(200).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    if (data.ok) {
      if (data.n === 0) {
        return res.status(200).json({ ok: false, error: errHint })
      }
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const getUsersWithPg = (req, res) => {
  let role = req.query.role
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  if (role && !ROLES.includes(role)) {
    return res.status(400).json({ ok: false, error: '没有该角色！' })
  }
  const getUsersWithPg$ = Service.getUsersWithPg(page, size, {
    role,
    fromDate,
    toDate
  })

  getUsersWithPg$.subscribe(createObserver(res, '没有找到相关用户。'))
}

const createUser = (req, res) => {
  let user = req.body
  user.password = req.body.password
  Service.createUser(user, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    return res.status(200).json({ ok: true, result: doc })
  })
}

const getAllUsers = (req, res) => {
  const getAllUsers$ = Service.getAllUsers()
  getAllUsers$.subscribe(createObserver(res, '还没有用户，请添加。'))
}

const getUserByUsername = (req, res) => {
  let username = req.params.username
  const getUserByUsername$ = Service.getUserByUsername(username)
  getUserByUsername$.subscribe(createObserver(res, '没有找到用户。'))
}

const deleteUserByUsername = (req, res) => {
  let username = req.params.username
  const deleteUserByUsername$ = Service.deleteUserByUsername(username)
  deleteUserByUsername$.subscribe(createObserver(res, '没有找到用户。'))
}

const updateUserByUsername = (req, res) => {
  let username = req.params.username
  let update = req.body
  const updateUserByUsername$ = Service.updateUserByUsername(username, update)
  updateUserByUsername$.subscribe(createObserver(res, '没有找到用户。'))
}

const resetPassword = (req, res) => {
  let username = req.body.username
  let password = req.body.password
  Service.resetPassword(username, password, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    return res.status(200).json({ ok: true, result: doc })
  })
}

export {
  uploadLicense,
  uploadIdFront,
  uploadIdBack,
  getLicenseUrl,
  getIdFrontUrl,
  getIdBackUrl,
  getUsersWithPg,
  getAllUsers,
  // getUsersByRoleWithPg,
  // getUsersByDateWithPg,
  updateUserByUsername,
  deleteUserByUsername,
  createUser,
  getUserByUsername,
  resetPassword
}
