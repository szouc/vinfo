// generalize the Finding documents in specific Model
export const generateGetData = (req, res) => (model) => (options) => {
  model.find(options)
    .then((document) => {
      res.json({data: document})
    })
    .catch((e) => {
      res.status(500).send('Couldnt run the query smart guy')
    })
}

// generailize the Creating document in specific Model
export const generatePostData = (req, res) => (model) => (options) => {
  model.create(options)
    .then(() => {
      res.status(200).send(`You have added a new ${model.modelName}.`)
    })
    .catch((e) => {
      res.status(500).send(`Couldnt save the ${model.modelName} at this time`)
    })
}

// generailize the Deleting document in specific Model
export const generateDeleteData = (req, res) => (model) => (options) => {
  model.remove(options)
    .then(() => {
      res.status(200).send(`You have removed a ${model.modelName}.`)
    })
    .catch((e) => {
      res.status(500).send(`Couldnt remove the ${model.modelName} at this time`)
    })
}
