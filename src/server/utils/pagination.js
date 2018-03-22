import { Observable } from 'rxjs'

const producePagination = Model => (pageNumber, pageSize, query) =>
  Observable.fromPromise(Model.find(query).count()).map(total => {
    let nextPage = 0
    let previousPage = 0
    if (total > pageNumber * pageSize) {
      nextPage = pageNumber + 1
    }
    if (pageNumber > 1) {
      previousPage = pageNumber - 1
    }
    return {
      total,
      pageNumber,
      pageSize,
      nextPage,
      previousPage
    }
  })

const getModelSortedData = (Model, projection, sortField) => (
  pageNumber,
  pageSize,
  query
) =>
  Observable.fromPromise(
    Model.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sortField)
      .select(projection)
      .lean()
      .exec()
  )

const addPagination = (pageObservable, dataObservable) => {
  return Observable.forkJoin(pageObservable, dataObservable)
    .catch(error => Observable.of(error))
    .map(data => {
      let [pagination, doc] = data
      return {
        doc,
        pagination
      }
    })
}

export { producePagination, getModelSortedData, addPagination }
