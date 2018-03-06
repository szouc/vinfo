import { company } from '@server/exports/api'
import addHostAddr from '@clientUtils/addHostAddr'

export const COMPANY_ROOT = addHostAddr(company.COMPANY_ROOT)
export const COMPANY_ID = addHostAddr(company.COMPANY_ID)
export const COMPANY_QUERY = addHostAddr(company.COMPANY_QUERY)
