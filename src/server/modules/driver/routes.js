// @flow

export const DRIVER_ROOT = '/driver'

export const DRIVER_ALL = '/all'
export const DRIVER_ID = '/:username'
export const DRIVER_VEHICLE = '/:username/vehicle'
export const DRIVER_FUEL = '/:username/fuel'
export const DRIVER_FUEL_ID = '/:username/fuel/:childId'
export const DRIVER_MAINTAIN = '/:username/maintenance'
export const DRIVER_MAINTAIN_ID = '/:username/maintenance/:childId'
export const DRIVER_TRANSPORT = '/:username/transport'
// export const DRIVER_TRANSPORT_STATUS = '/:username/transport/status'
export const DRIVER_TRANSPORT_ID = '/:username/transport/:childId'
// meantime change vehicle status, so take the route from 'DRIVER_TRANSPORT_ID'
export const DRIVER_TRANSPORT_ID_STATUS = '/:username/transport/:childId/status'
export const DRIVER_TRANSPORT_UPLOAD_PIC =
  '/:username/transport/:childId/upload/shipping'
