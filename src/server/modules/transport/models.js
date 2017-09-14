import { db } from '../../settings/db'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const baseTransport = {}

const TransportSchema = new Schema(baseTransport)

const Transport = db.model('Transport', TransportSchema)

export { Transport }
