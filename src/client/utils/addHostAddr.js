// @flow

import { WEB_ADDR } from '../settings/config'

const addHostAddr = (route: ?string): string => WEB_ADDR + route

export default addHostAddr
