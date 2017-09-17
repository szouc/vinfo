import { Account } from './models'

function getAllAccounts(req, res) {
  Account.find({active: true})
    .lean()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('No account matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find all account')
    })
}

function getAccountById(req, res) {
  Account.findById(req.params.id)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No account matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find account by id')
    })
}

function updateAccountById(req, res) {
  Account.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No account matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt update account by id')
    })
}

function deleteAccountById(req, res) {
  Account.findByIdAndUpdate(
    req.params.id,
    { $set: { active: false } },
    { new: true }
  )
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No account matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt delete account by id')
    })
}

function updateAccountStatusById(req, res) {
  Account.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No account matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt update account status by id')
    })
}

export {
  getAllAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById,
  updateAccountStatusById
}
