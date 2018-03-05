import * as Service from './services'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    if (data.pagination) {
      if (data.doc.length === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const createCompany = (req, res) => {
  let company = req.body
  const createCompany$ = Service.createCompany(company)
  createCompany$.subscribe(createObserver(res, '公司没有创建。'))
}

const getCompaniesWithPg = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  const getCompaniesWithPg$ = Service.getCompaniesWithPg(page, size, {
    fromDate,
    toDate
  })
  getCompaniesWithPg$.subscribe(createObserver(res, '没有找到相关公司。'))
}

const getAllCompanies = (req, res) => {
  const getAllCompanies$ = Service.getAllCompanies()
  getAllCompanies$.subscribe(createObserver(res, '还没有公司，请添加。'))
}

const getCompanyById = (req, res) => {
  let companyId = req.params.id
  const getCompanyById$ = Service.getCompanyById(companyId)
  getCompanyById$.subscribe(createObserver(res, '没有找到相关公司。'))
}

const updateCompanyById = (req, res) => {
  let companyId = req.params.id
  let update = req.body
  const updateCompanyById$ = Service.updateCompanyById(companyId, update)
  updateCompanyById$.subscribe(createObserver(res, '没有找到符合条件的公司。'))
}

const deleteCompanyById = (req, res) => {
  let companyId = req.params.id
  const deleteCompanyById$ = Service.deleteCompanyById(companyId)
  deleteCompanyById$.subscribe(createObserver(res, '没有找到符合条件的公司。'))
}

const getCompaniesByQuery = (req, res) => {
  let query = req.query
  const getCompaniesByQuery$ = Service.getCompaniesByQuery(query)
  getCompaniesByQuery$.subscribe(createObserver(res, '没有找到相关公司。'))
}

export {
  createCompany,
  getCompaniesWithPg,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompaniesByQuery
}
