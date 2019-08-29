import Product from '../model/product';

const postProduct = (req, res) => {
  const {name, description, price, image} = req.body;
  //If there are one document with the same title, description, content and author is because is the same document that
  //we will put in our database.
  Product.find({name, description, price, image})
    .then((response) => {
      if (response.length > 0) {
        const errorMessage = 'This document already exists on database';
        res.status(409).json({message: errorMessage});
      } else {
        const newProduct = new Product({
          name,
          description,
          price,
          image
        });

        newProduct.save((err, data) => {
          if (err) {
            res.json(err)
          } else {

            const returnData = {
              data: data,
              message:'Document created correctly'
            };

            res.status(201).json(returnData)
          }
        })
      }
    })
};

const getProducts = (req, res) => {
  const {state} = req.query;
  if (!state) {
    Product.find()
      .then((response) => {
        res.status(200).json({data: response})
      })
  } else {
    const petition = state === 'archived';
    Product.find({isArchived: petition})
      .then((response) => {
        res.status(200).json({data: response})
    })
  }
};

const getProduct = (req, res) => {
  const {id} = req.body;
  Product.findById(id)
    .then((result) => {
      res.status(200).json({data: result});
    })
    .catch((err) => {
      res.status(200).json({data: []})
    })
};

const removeProduct = (req, res) => {
  const {id} = req.query;
  Product.findByIdAndRemove(id)
    .then((result) => {
      const response = {
        message: 'Product was delete',
        product_id: result._id
      };

      res.status(200).json({response});
    })
    .catch((err) => {
      res.status(400).json({message: 'Product not found'})
    })
};

const updateProduct = (req, res) => {
  const {id, name, description, price, image} = req.body;
  Product.findByIdAndUpdate(id, {
    price,
    description,
    name
  }).then((result) => {
    const response = {
      message: "Product updated"
    };

    res.status(200).json(response);
  }).catch((err) => {
    const response = {
      message: "Document not found"
    };

  res.status(200).json(response);
  })
};

export {
  postProduct,
  getProducts,
  getProduct,
  removeProduct,
  updateProduct
}