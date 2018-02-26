import { Observable } from 'rxjs'

const addPagination = (countObservable, dataObservable) => (
  pageNumber,
  pageSize
) => {
  return Observable.forkJoin(
    countObservable(),
    dataObservable(pageNumber, pageSize)
  )
    .catch(error => Observable.of(error))
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
}

export { addPagination }
