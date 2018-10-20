// @flow

import Excel from 'exceljs'

export const generateWorkbook = (
  sheetName: String,
  columns: Array<any>,
  rows: Array<any>
) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet(sheetName)

  worksheet.columns = columns
  worksheet.addRows(rows)

  return workbook
}
