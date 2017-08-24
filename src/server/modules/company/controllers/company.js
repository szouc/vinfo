import Company from '../models/company'

function createCompany (req, res) {
  Company.create(req.body)
    .then(() => {
      res.status(200).send('You have added a new company')
    })
    .catch(() => {
      res.status(500).send('Couldnt save the company at this time')
    })
}

function getAllCompany (req, res) {
  Company.find({})
    .then((document) => {
      res.status(200).json(document)
    })
    .catch(() => {
      res.status(500).send('Couldnt find all company')
    })
}

function getCompanyByName (req, res) {
  Company.findOne({name: req.params.name})
    .then((company) => {
      res.status(200).json(company)
    })
    .catch(() => {
      res.status(500).send('Couldnt find company by name')
    })
}

export { createCompany, getAllCompany, getCompanyByName }
