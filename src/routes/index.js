import {Router} from 'express';
import {index} from '../controller'
import {
  getProducts,
  getProduct,
  postProduct,
  removeProduct,
  updateProduct
} from "../controller/document";

import {check} from "express-validator/check";
import {postCheckValidation} from "../middleware/validation";

export default () => {
  const routes = Router();
  routes.get('/',
    (req, res) => index(req, res)
  );

  routes.post('/product',
    [
      check('name').isLength({min: 4}),
      check('description').isLength({min: 2}),
      check('price').exists(),
      check('image').exists(),
    ],
    (req, res, next) => postCheckValidation(req, res, next),
    (req, res) => postProduct(req, res));

  routes.get('/products',
    getProducts
  );

  routes.get('/product',
    [
      check('id').isString()
    ],
    (req, res, next) => postCheckValidation(req, res, next),
    (req, res) => getProduct(req, res)
  );

  routes.delete('/product',
    [
      check('id').isString()
    ],
    (req, res, next) => postCheckValidation(req, res, next),
    (req, res) => removeProduct(req, res)
  );

  routes.put('/product',
    [
      check('id').isString(),
      check('name').isLength({min: 4}),
      check('description').isLength({min: 2}),
      check('price').exists(),
      check('image').exists(),
    ],
    (req, res, next) => postCheckValidation(req, res, next),
    (req, res) => updateProduct(req, res)
  );

  return routes;
}