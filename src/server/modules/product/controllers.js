import { Product } from './models'

function createProduct(req, res) {
  Product.create(req.body)
    .then(() => {
      res.status(200).send('You have added a new product')
    })
    .catch(e => {
      res.status(500).send('Couldnt save the product at this time')
    })
}

function getAllProducts(req, res) {
  Product.find({ active: true })
    .lean()
    .then(docs => {
      if (docs) {
        res.status(200).json(docs)
      } else {
        res.status(400).send('No products matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find all product')
    })
}

function getProductById(req, res) {
  Product.findById(req.params.id)
    .lean()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No product matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find product by id')
    })
}

function addProductPriceHistory(req, res) {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { price_history: { $each: req.body } }
    },
    { new: true }
  )
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No product matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find product by id')
    })
}

function deleteProductPriceHistory(req, res) {
  Product.findById(req.params.id)
    .then(doc => {
      if (doc) {
        doc.price_history.id(req.params.childId).remove()
        return doc.save()
      } else {
        res.status(400).send('Couldnt find the product by id')
      }
    })
    .then(() => {
      res.status(200).send('Delete price history by id')
    })
    .catch(() => {
      res.status(500).send('Couldnt delete price history by id')
    })
}

// function deleteProductPriceHistory(req, res) {
//   Product.findById(req.params.id)
//     .then(doc => {
//       if (doc) {
//         doc.price_history.id(req.params.childId).remove()
//         doc
//           .save()
//           .then(() => {
//             res.status(200).json(doc)
//           })
//           .catch(() => {
//             res.status(500).send('Couldnt find product by id')
//           })
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No product matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find product by id')
//     })
// }

function updateProductById(req, res) {
  Product.findOneAndUpdate(req.param.id, { $set: req.body }, { new: true })
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No product matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find product by id')
    })
}

function deleteProductById(req, res) {
  Product.findOneAndRemove(req.param.id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(400).send('No product matching')
      }
    })
    .catch(() => {
      res.status(500).send('Couldnt find product by id')
    })
}

export {
  createProduct,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
