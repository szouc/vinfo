import mongoose from 'mongoose'
import { db } from '../../settings/db'
import passportLocalMongoose from 'passport-local-mongoose'

import { ROLES, GENDERS } from './constants'

const Schema = mongoose.Schema

/*
* baseUser Types
* password property set in passport-local-mongoose
*/
const userFields = {
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
    enum: GENDERS,
    default: GENDERS[0]
  },
  role: {
    type: String,
    enum: ROLES,
    default: ROLES[0]
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  detail: {
    licenseNo: {
      type: String,
      trim: true
    },
    licensePic: {
      type: String
    },
    certNo: {
      type: String,
      trim: true
    },
    certExpired: {
      type: Date
    },
    idNo: {
      type: String,
      trim: true
    },
    idFrontPic: {
      type: String
    },
    idBackPic: {
      type: String
    },
    QQ: {
      type: String,
      trim: true
    },
    Email: {
      type: String,
      trim: true
    }
  },
  active: {
    type: Boolean,
    default: true
  }
}

const UserSchema = new Schema(userFields, { timestamps: true })

const plmOptions = {
  limitAttempts: true
}
UserSchema.plugin(passportLocalMongoose, plmOptions)

const User = db.model('User', UserSchema)
export { UserSchema, User }
