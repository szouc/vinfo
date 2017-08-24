//
// MongoDB setting
//
const DB_ADDR = 'localhost'
const DB_PORT = '27017'
const DB_NAME = 'vinfo'
const DB_USER = 'sz'
const DB_PASS = 'abc123'
export const DB_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_ADDR}:${DB_PORT}/${DB_NAME}`

// Server Configurations
export const SESSION_SECRET_KEY = 'vinfo_website_s3cr3t_$k3y'
