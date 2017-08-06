import {ACCOUNT, ADMIN, CAPTAIN, DRIVER, FEMALE, MALE, MANAGER, STAFF} from '../../shared/config'

import conn from '../../../config/conn'
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const db = conn.getConnection()
const Schema = mongoose.Schema

// User Role Enum
const roles = [STAFF, DRIVER, CAPTAIN, ACCOUNT, MANAGER, ADMIN]
const genders = [MALE, FEMALE]

/*
* baseUser Types
*/
const baseUser = {
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
* add some properties about your project.
*/
const vinfoUser = {
  ...baseUser,
  driver: {
    license: {
      type: String,
      trim: true
    },
    cert: {
      number: {
        type: String,
        trim: true
      },
      expired: {
        type: Date
      }
    },
    idFront: {
      type: String
    },
    idBack: {
      type: String
    }
  }
}

const UserSchema = new Schema(vinfoUser)

const plmOptions = {
  limitAttempts: true
}
UserSchema.plugin(passportLocalMongoose, plmOptions)

const User = db.model('User', UserSchema)
export default User
