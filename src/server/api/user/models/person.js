import mongoose from 'mongoose'
import conn from '../../../config/conn'

const db = conn.getConnection()
const Schema = mongoose.Schema

/*
* User Schema
*/

const UserSchema = new Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
})

const User = db.model('User', UserSchema)
export default User
