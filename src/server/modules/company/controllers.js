import { Company } from './models'

function createCompany(req, res) {
  Company.create(req.body)
    .then((doc) => {
      res.status(200).json(doc)
    })
    .catch((e) => {
      res.status(500).send('Couldnt save the company at this time')
    })
}

function getAllCompanies(req, res) {
  Company.find({active: true}, '_id name addr')
    .lean()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('No companies matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find all company')
    })
}

function getCompanyById(req, res) {
  Company.findById(req.params.id)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No company matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find company by id')
    })
}

/**
 * Update a company document and return altered document
 */
function updateCompanyById(req, res) {
  Company.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true })
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No company modified')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt modify company by id')
    })
}

function deleteCompanyById(req, res) {
  Company.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('Fault to deleted a company')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt delete company by id')
    })
}

function getCompanyByQuery(req, res) {
  Company.find(req.query)
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('Fault to query some companies')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt query companies at this time')
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
