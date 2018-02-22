import { Observable } from 'rxjs'

const generateQueryCallback = (errHint, callback) => {
  return (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error(errHint))
    }
    return callback(null, doc)
  }
}

/**
 * Model or Query will Executes immediately if callback function is passed.
 * Otherwise, the query statement will return a Query like 'Promise'.
 **/
const returnPromiseOrExec = (dbQuery, errHint, callback) => {
  if (typeof callback === 'function') {
    return dbQuery.lean().exec(generateQueryCallback(errHint, callback))
  }
  return dbQuery
}

const addPagination = (fn, query, sortField) => async (
  pageNumber,
  pageSize,
  callback
) => {
  try {
    const [total, doc] = await Promise.all([
      fn(query).count(),
      fn(query)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort(sortField)
        .lean()
    ])
    if (!total || !doc) {
      return callback(new Error('还没有相关的记录。'))
    }
    let nextPage = 0
    let previousPage = 0
    if (total > pageNumber * pageSize) {
      nextPage = pageNumber + 1
    }
    if (pageNumber > 1) {
      previousPage = pageNumber - 1
    }
    return callback(null, doc, {
      total,
      pageNumber,
      pageSize,
      nextPage,
      previousPage
    })
  } catch (error) {
    return callback(error)
  }
}

const addPagination1 = (countObservable, dataObservable) => (
  pageNumber,
  pageSize
) => {
  return Observable.forkJoin(
    countObservable(),
    dataObservable(pageNumber, pageSize)
  )
    .map(data => {
      let nextPage = 0
      let previousPage = 0
      let total = data[0]
      let doc = data[1]
      if (data[0] > pageNumber * pageSize) {
        nextPage = pageNumber + 1
      }
      if (pageNumber > 1) {
        previousPage = pageNumber - 1
      }
      return {
        doc: doc,
        pagination: {
          total,
          pageNumber,
          pageSize,
          nextPage,
          previousPage
        }
      }
    })
    .catch(error => Observable.of(error))
}

export {
  generateQueryCallback,
  returnPromiseOrExec,
  addPagination,
  addPagination1
}
