// @flow

export default function createRoute(rootPath: string) {
  return (...relativePath: Array<string>): ?string => {
    return rootPath + relativePath.reduce((pre, cur) => pre + cur)
  }
}
