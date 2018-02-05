import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  return res.status(200).json({ ok: true, result: doc })
}

const createCompany = (req, res) => {
  let company = req.body
  Service.createCompany(company, generateResponseCallback(res))
}

const getCompanies = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  Service.getCompanies(page, size, generateResponseCallback(res))
}

const getAllCompanies = (req, res) => {
  Service.getAllCompanies(generateResponseCallback(res))
}

const getCompanyById = (req, res) => {
  let companyId = req.params.id
  Service.getCompanyById(companyId, generateResponseCallback(res))
}

const updateCompanyById = (req, res) => {
  let companyId = req.params.id
  let update = req.body
  Service.updateCompanyById(companyId, update, generateResponseCallback(res))
}

const deleteCompanyById = (req, res) => {
  let companyId = req.params.id
  Service.deleteCompanyById(companyId, generateResponseCallback(res))
}

const getCompanyByQuery = (req, res) => {
  let query = req.query
  Service.getCompanyByQuery(query, generateResponseCallback(res))
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
