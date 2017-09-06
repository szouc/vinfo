import { company } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const COMPANY_ROOT_API = addHostAddr(company.COMPANY_ROOT_API)
export const COMPANY_ID_API = addHostAddr(company.COMPANY_ID_API)
export const COMPANY_QUESRY_API = addHostAddr(company.COMPANY_QUERY_API)
