import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const generateResponseCallback = res => (err, doc, pagination = {}) => {
  if (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
  return res.status(200).json({ ok: true, result: doc, pagination })
}

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    if (data.doc && data.doc.length === 0) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const createCompany = (req, res) => {
  let company = req.body

  // const createCompany$ = Observable.fromPromise(Company.create(company))
  // Service.createCompany(company, generateResponseCallback(res))
  const createCompany$ = Service.createCompany1(company)
  createCompany$.subscribe(createObserver(res, '公司没有创建。'))
}

const getCompaniesWithPagination = (req, res) => {
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  // const getCompaniesPage = Service.getCompaniesWithPagination()
  // getCompaniesPage(page, size, generateResponseCallback(res))
  const getCompaniesPage$ = Service.getCompaniesWithPagination1(page, size)
  getCompaniesPage$.subscribe(createObserver(res, '没有找到相关公司。'))
}

const getAllCompanies = (req, res) => {
  // Service.getAllCompanies(generateResponseCallback(res))
  const getAllCompanies$ = Service.getAllCompanies1()
  getAllCompanies$.subscribe(createObserver(res, '还没有公司，请添加。'))
}

const getCompanyById = (req, res) => {
  let companyId = req.params.id
  // Service.getCompanyById(companyId, generateResponseCallback(res))
  const getCompanyById$ = Service.getCompanyById1(companyId)
  getCompanyById$.subscribe(createObserver(res, '没有找到相关公司。'))
}

const updateCompanyById = (req, res) => {
  let companyId = req.params.id
  let update = req.body
  // Service.updateCompanyById(companyId, update, generateResponseCallback(res))
  const updateCompanyById$ = Service.updateCompanyById1(companyId, update)
  updateCompanyById$.subscribe(createObserver(res, '没有找到符合条件的公司。'))
}

const deleteCompanyById = (req, res) => {
  let companyId = req.params.id
  // Service.deleteCompanyById(companyId, generateResponseCallback(res))
  const deleteCompanyById$ = Service.deleteCompanyById1(companyId)
  deleteCompanyById$.subscribe(createObserver(res, '没有找到符合条件的公司。'))
}

const getCompaniesByQuery = (req, res) => {
  let query = req.query
  Service.getCompaniesByQuery(query, generateResponseCallback(res))
}

export {
  createCompany,
  getCompaniesWithPagination,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompaniesByQuery
}
