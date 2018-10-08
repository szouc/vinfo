import multer from 'multer'

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storageCreator = path => ({
  storage: multer.diskStorage({
    destination: `./dist/uploads/${path}`,
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
})

export const getImageUrl = path => (req, res) => {
  const file = req.file
  const imageUrl = `/static/uploads/${path}/${file.filename}`
  res.status(200).json(imageUrl)
}

export const uploadImage = (field, path) =>
  multer(storageCreator(path)).single(field)
