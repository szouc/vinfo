import { vehicle } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const VEHICLE_ROOT_API = addHostAddr(vehicle.VEHICLE_ROOT_API)
export const VEHICLE_ID_API = addHostAddr(vehicle.VEHICLE_ID_API)
export const VEHICLE_FUEL_API = addHostAddr(vehicle.VEHICLE_FUEL_API)
export const VEHICLE_FUEL_ID_API = addHostAddr(vehicle.VEHICLE_FUEL_ID_API)
export const VEHICLE_MAINTAIN_API = addHostAddr(vehicle.VEHICLE_MAINTAIN_API)
export const VEHICLE_MAINTAIN_ID_API = addHostAddr(vehicle.VEHICLE_MAINTAIN_ID_API)
