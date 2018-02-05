import { Product } from './models'

/*
* Model or Query will Executes immediately if callback function is passed.
* Otherwise, the query statement will return a Promise.
*/
const generateQueryCallback = (queryError, callback) => {
  if (typeof callback !== 'function') {
    return null
  }
  return (err, doc) => {
    if (err) {
      return callback(err)
    }
    if (!doc) {
      return callback(new Error(queryError))
    }
    callback(null, doc)
  }
}

const createProduct = (product, callback) => {
  return Product.create(
    product,
    generateQueryCallback('无法创建该产品。', callback)
  )
}

const getProducts = (pageNumber, pageSize, callback) => {
  return Product.find({ active: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .lean()
    .exec(generateQueryCallback('还没有产品，请添加。', callback))
}

const getAllProducts = callback => {
  return Product.find({ active: true })
    .lean()
    .exec(generateQueryCallback('还没有产品，请添加。', callback))
}

const getProductById = (id, callback) => {
  return Product.findById(id)
    .lean()
    .exec(generateQueryCallback('没有找到该产品。', callback))
}

const updateProductById = (id, update, callback) => {
  return Product.findByIdAndUpdate(id, { $set: update }, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该产品。', callback))
}

const deleteProductById = (id, callback) => {
  return Product.findByIdAndUpdate(id, { active: false }, { new: true })
    .lean()
    .exec(generateQueryCallback('没有找到该产品。', callback))
}

const addProductPriceHistory = (id, priceHistory, callback) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $addToSet: { price_history: { $each: priceHistory } }
    },
    { new: true }
  )
    .lean()
    .exec(generateQueryCallback('没有找到该产品。', callback))
}

const deleteProductPriceHistory = (id, childId, callback) => {
  return Product.findById(id)
    .then(doc => {
      if (!doc) {
        return callback(new Error('没有找到该产品。'))
      }
      doc.price_history.id(childId).remove()
      return doc.save(generateQueryCallback('无法删除历史价格。', callback))
    })
    .catch(err => callback(err))
}

// const createProduct = (product, callback) => {
//   Product.create(product)
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('无法创建该产品。'))
//       }
//       callback(null, doc)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

// const getProducts = (pageNumber, pageSize, callback) => {
//   Product.find({ active: true })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .lean()
//     .then(docs => {
//       if (!docs) {
//         return callback(new Error('还没有产品，请添加。'))
//       }
//       callback(null, docs)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

// const getAllProducts = callback => {
//   Product.find({ active: true })
//     .lean()
//     .then(docs => {
//       if (!docs) {
//         return callback(new Error('还没有产品，请添加。'))
//       }
//       callback(null, docs)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

// const getProductById = (id, callback) => {
//   Product.findById(id)
//     .lean()
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('没有找到该产品。'))
//       }
//       callback(null, doc)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

// function addProductPriceHistory(req, res) {
//   Product.findByIdAndUpdate(
//     req.params.id,
//     {
//       $addToSet: { price_history: { $each: req.body } }
//     },
//     { new: true }
//   )
//     .then(doc => {
//       if (doc) {
//         res.status(200).json(doc)
//       } else {
//         res.status(400).send('No product matching')
//       }
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt find product by id')
//     })
// }

// function deleteProductPriceHistory(req, res) {
//   Product.findById(req.params.id)
//     .then(doc => {
//       if (doc) {
//         doc.price_history.id(req.params.childId).remove()
//         return doc.save()
//       } else {
//         res.status(400).send('Couldnt find the product by id')
//       }
//     })
//     .then(doc => {
//       res.status(200).json(doc)
//     })
//     .catch(() => {
//       res.status(500).send('Couldnt delete price history by id')
//     })
// }

// const updateProductById = (id, update, callback) => {
//   Product.findByIdAndUpdate(id, { $set: update }, { new: true })
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('没有找到该产品。'))
//       }
//       callback(null, doc)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

// const deleteProductById = (id, callback) => {
//   Product.findByIdAndUpdate(id, { active: false }, { new: true })
//     .then(doc => {
//       if (!doc) {
//         return callback(new Error('没有找到该产品。'))
//       }
//       callback(null, doc)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }

export {
  createProduct,
  getProducts,
  getAllProducts,
  getProductById,
  addProductPriceHistory,
  deleteProductPriceHistory,
  updateProductById,
  deleteProductById
}
