import { Account } from './models'
import * as TransportService from '../transport/services'
// import { Observable } from 'rxjs'

const PAGE_NUMBER = 1 // default number of page
const PAGE_SIZE = 20 // default size of page

const createObserver = (res, errHint) => ({
  next: data => {
    if (!data) {
      return res.status(400).json({ ok: false, error: errHint })
    }
    if (data.doc) {
      if (data.doc.length === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
      return res
        .status(200)
        .json({ ok: true, result: data.doc, pagination: data.pagination })
    }
    if (data.ok) {
      if (data.n === 0) {
        return res.status(400).json({ ok: false, error: errHint })
      }
    }
    return res.status(200).json({ ok: true, result: data })
  },
  error: err => {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

const getAllTransports = (req, res) => {
  let fromDate = req.query.from
  let toDate = req.query.to
  let page = req.query.page ? parseInt(req.query.page) : PAGE_NUMBER
  let size = req.query.size ? parseInt(req.query.size) : PAGE_SIZE
  let username = req.params.username
  const getAllTransports$ = TransportService.getTransportsWithPg(page, size, {
    accountant: username,
    fromDate,
    toDate
  })
  getAllTransports$.subscribe(createObserver(res, '没有相关运输记录。'))
}

//   Account.find({active: true})
//     .lean()
//     .then(docs => {
//       if (docs) {
//         res.status(200).json(docs)
//       } else {
//         res.status(400).send('No account matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find all account')
//     })
// }

const getAccountById = (req, res) => {
  const getAccountById$ = TransportService.getTransportById(req.params.childId)
  getAccountById$.subscribe(createObserver(res, '没有找到相关运输记录。'))
}
//   Account.findById(req.params.id)
//     .lean()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No account matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find account by id')
//     })
// }

// const updateAccountById = (req, res) => {
//   const updateAccountById$ = TransportService.updateTransportById(
//     req.params.childId,
//     req.body
//   )
//   updateAccountById$.subscribe(createObserver(res, '没有找到相关运输记录。'))
// }
//   Account.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .lean()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No account matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt update account by id')
//     })
// }

const deleteAccountById = (req, res) => {
  const deleteAccountById$ = TransportService.deleteTransportById(
    req.params.childId
  )
  deleteAccountById$.subscribe(createObserver(res, '没有找到相关运输记录。'))
}
//   Account.findByIdAndUpdate(
//     req.params.id,
//     { $set: { active: false } },
//     { new: true }
//   )
//     .lean()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No account matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt delete account by id')
//     })
// }

const updateAccountStatusById = (req, res) => {
  const updateStatus = req.body.status
  const updateAccountStatusById$ = TransportService.checkAccountById(
    req.params.username,
    req.params.childId,
    updateStatus
  )
  updateAccountStatusById$.subscribe(
    createObserver(res, '没有找到相关运输记录。')
  )
}
//   Account.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//     .lean()
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No account matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt update account status by id')
//     })
// }

export {
  getAllTransports,
  getAccountById,
  // updateAccountById,
  deleteAccountById,
  updateAccountStatusById
}
