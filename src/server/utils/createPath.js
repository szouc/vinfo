// @flow

export default function createPath(rootPath: string) {
  return (...relativePath: Array<string>): ?string => {
    return rootPath + relativePath.reduce((pre, cur) => pre + cur)
  }
}
