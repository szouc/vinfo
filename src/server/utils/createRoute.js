// @flow

import reduce from 'lodash.reduce'

export default function createRoute(rootPath: string) {
  return (...relativePath: Array<string>): ?string => {
    return rootPath + reduce(relativePath, (pre, cur) => pre + cur)
  }
}
