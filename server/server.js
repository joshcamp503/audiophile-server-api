const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const Product = require("./models/product")

const app = express();

app.use(cors());
app.use(express.json());
// app.use(Router)

// I know this is not very secure, that's why the password is meh
const username = `joshcamp503`
const password = `mongodbpassword`

// connect to mongodb
const PORT = process.env.PORT || 3001
const dbURI = `mongodb+srv://joshcamp503:mongodbpassword@cluster0.hogdo.mongodb.net/audiophile?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, () => console.log('connected')))
  .catch((err) => console.log(err))

// routes
app.get('/products/:category?/:slug?', async (req, res) => {
  Product.find(req.query)
    .then((result) => {
      console.log(req.query)
      res.send(result)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

app.get('/products', async (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})