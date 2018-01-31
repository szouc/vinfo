// @ flow

import multer from 'multer'

import { ROLES } from './constants'
import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const uploadImageUrl = path => (req, res) => {
  const file = req.file
  const imageUrl = `/static/uploads/${path}/${file.filename}`
  res.status(200).json({ ok: true, result: imageUrl })
}

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storageCreator = path => ({
  storage: multer.diskStorage({
    destination: `./dist/uploads/${path}`,
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

const LICENSE_UPLOAD_PATH = 'license'
const ID_FRONT_UPLOAD_PATH = 'id_front'
const ID_BACK_UPLOAD_PATH = 'id_back'
const uploadLicense = multer(storageCreator(LICENSE_UPLOAD_PATH)).single(
  LICENSE_UPLOAD_PATH
)
const uploadIdFront = multer(storageCreator(ID_FRONT_UPLOAD_PATH)).single(
  ID_FRONT_UPLOAD_PATH
)
const uploadIdBack = multer(storageCreator(ID_BACK_UPLOAD_PATH)).single(
  ID_BACK_UPLOAD_PATH
)
const getLicenseUrl = uploadImageUrl(LICENSE_UPLOAD_PATH)
const getIdFrontUrl = uploadImageUrl(ID_FRONT_UPLOAD_PATH)
const getIdBackUrl = uploadImageUrl(ID_BACK_UPLOAD_PATH)

const getUsers = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  Service.getUsers(page, size, (err, docs) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: docs })
  })
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
  Service.getAllUsers((err, docs) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: docs })
  })
}

const getUsersByRole = (req, res) => {
  let role = req.params.role
  if (!ROLES.includes(role)) {
    return res.status(400).json({ ok: false, error: '没有该角色！' })
  }
  Service.getUsersByRole(role, (err, docs) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: docs })
  })
}

const getUserByUsername = (req, res) => {
  let username = req.params.username
  Service.getUserByUsername(username, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

const deleteUserByUsername = (req, res) => {
  let username = req.params.username
  Service.deleteUserByUsername(username, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: username })
  })
}

const updateUserByUsername = (req, res) => {
  let username = req.params.username
  let update = req.body
  Service.updateUserByUsername(username, update, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

const resetPassword = (req, res) => {
  let username = req.body.username
  let password = req.body.password
  Service.resetPassword(username, password, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

export {
  uploadLicense,
  uploadIdFront,
  uploadIdBack,
  getLicenseUrl,
  getIdFrontUrl,
  getIdBackUrl,
  getUsers,
  getAllUsers,
  getUsersByRole,
  updateUserByUsername,
  deleteUserByUsername,
  createUser,
  getUserByUsername,
  resetPassword
}
