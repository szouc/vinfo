import * as Service from './services'

const createCompany = (req, res) => {
  let company = req.body
  Service.createCompany(company, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

const getAllCompanies = (req, res) => {
  Service.getAllCompanies((err, docs) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    return res.status(200).json({ ok: true, result: docs })
  })
}

const getCompanyById = (req, res) => {
  let companyId = req.params.id
  Service.getCompanyById(companyId, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

const updateCompanyById = (req, res) => {
  let companyId = req.params.id
  let update = req.body
  Service.updateCompanyById(companyId, update, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: doc })
  })
}

const deleteCompanyById = (req, res) => {
  let companyId = req.params.id
  Service.deleteCompanyById(companyId, (err, doc) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: companyId })
  })
}

const getCompanyByQuery = (req, res) => {
  let query = req.query
  Service.getCompanyByQuery(query, (err, docs) => {
    if (err) {
      return res.status(400).json({ ok: false, error: err.message })
    }
    res.status(200).json({ ok: true, result: docs })
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
