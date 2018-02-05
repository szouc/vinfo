import { Company } from './models'

/*
* Model or Query will Executes immediately if callback function is passed.
* Otherwise, the query statement will return a Promise.
*/
const generateQueryCallback = (queryError, callback) => {
  if (typeof callback !== 'function') {
    return null
  }
  return (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error(queryError))
    }
    callback(null, doc)
  }
}

const createCompany = (company, callback) => {
  // 'Create' cmd returns a Promise instead of the Query.
  return Company.create(
    company,
    generateQueryCallback('公司没有成功创建。', callback)
  )
}

const getCompanies = (pageNumber, pageSize, callback) => {
  return Company.find({ active: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .lean()
    .exec(generateQueryCallback('还没有公司，请添加。', callback))
}

const getAllCompanies = callback => {
  return Company.find({ active: true })
    .lean()
    .exec(generateQueryCallback('还没有公司，请添加。', callback))
}

const getCompanyById = (id, callback) => {
  return Company.findById(id)
    .lean()
    .exec(generateQueryCallback('没有找到该公司。', callback))
}

const updateCompanyById = (id, update, callback) => {
  return Company.findByIdAndUpdate(id, { $set: update }, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该公司。', callback))
}

const deleteCompanyById = (id, callback) => {
  return Company.findByIdAndUpdate(id, { active: false }, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该公司。', callback))
}

const getCompanyByQuery = (query, callback) => {
  return Company.find(query)
    .lean()
    .exec(generateQueryCallback('没有找到符合条件的公司。', callback))
}

export {
  createCompany,
  getCompanies,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery
}
