import { Company } from './models'

const createCompany = (company, callback) => {
  Company.create(company)
    .then(doc => {
      if (!doc) {
        return callback(new Error('公司没有成功创建。'))
      }
      callback(null, doc)
    })
    .catch(err => {
      callback(err)
    })
}

const getAllCompanies = callback => {
  Company.find({ active: true })
    .then(docs => {
      if (!docs) {
        return callback(new Error('还没有公司，请添加。'))
      }
      callback(null, docs)
    })
    .catch(err => {
      callback(err)
    })
}

const getCompanyById = (id, callback) => {
  Company.findById(id)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该公司。'))
      }
      callback(null, doc)
    })
    .catch(err => {
      callback(err)
    })
}

const updateCompanyById = (id, update, callback) => {
  Company.findByIdAndUpdate(id, { $set: update }, { new: true })
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有这个公司。'))
      }
      callback(null, doc)
    })
    .catch(err => {
      callback(err)
    })
}

const deleteCompanyById = (id, callback) => {
  Company.findByIdAndUpdate(id, { active: false }, { new: true })
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有这个公司。'))
      }
      callback(null, doc)
    })
    .catch(err => {
      callback(err)
    })
}

const getCompanyByQuery = (query, callback) => {
  Company.find(query)
    .then(docs => {
      if (!docs) {
        return callback(new Error('没有找到符合条件的公司。'))
      }
      callback(null, docs)
    })
    .catch(err => {
      callback(err)
    })
}

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyByQuery
}
