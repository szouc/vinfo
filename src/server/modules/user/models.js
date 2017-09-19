import mongoose from 'mongoose'
import { db } from '../../settings/db'
import passportLocalMongoose from 'passport-local-mongoose'

import {
  STAFF,
  DRIVER,
  CAPTAIN,
  ACCOUNTANT,
  MANAGER,
  ADMIN,
  MALE,
  FEMALE
} from './constants'

const Schema = mongoose.Schema

// User Role Enum
const roles = [STAFF, DRIVER, CAPTAIN, ACCOUNTANT, MANAGER, ADMIN]
const genders = [MALE, FEMALE]

/*
* baseUser Types
* password property set in passport-local-mongoose
*/
const baseUser = {
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  fullname: {
    type: String,
    trim: true,
    required: true
  },
  gender: {
    type: String,
    enum: genders,
    default: MALE
  },
  role: {
    type: String,
    enum: roles,
    default: STAFF
  },
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
}

/*
* vinfoUser Types extended from the baseUser Types,
* add some properties relating to your project.
*/
const vinfoUser = {
  ...baseUser,
  license: {
    type: String,
    trim: true
  },
  cert: {
    type: String,
    trim: true
  },
  cert_expired: {
    type: Date
  },
  id_front: {
    type: String
  },
  id_back: {
    type: String
  }
}

const UserSchema = new Schema(vinfoUser)

const plmOptions = {
  limitAttempts: true
}
UserSchema.plugin(passportLocalMongoose, plmOptions)

const User = db.model('User', UserSchema)
export { User }
