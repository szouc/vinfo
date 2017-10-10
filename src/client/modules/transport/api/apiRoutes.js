import { transport } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const TRANSPORT_ROOT_API = addHostAddr(transport.TRANSPORT_ROOT_API)
export const TRANSPORT_ID_API = addHostAddr(transport.TRANSPORT_ID_API)
export const TRANSPORT_STATUS_API = addHostAddr(transport.TRANSPORT_STATUS_API)
