import conn from '../../../config/conn'
import mongoose from 'mongoose'

const db = conn.getConnection()
const Schema = mongoose.Schema

const baseTransport = {

}

const TransportSchema = new Schema(baseTransport)

const Transport = db.model('Transport', TransportSchema)

export default Transport
