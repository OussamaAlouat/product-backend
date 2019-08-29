import {Router} from 'express';
import {index} from '../controller'
import {
    getAllDocuments,
    getOneDocument,
    postProduct,
    removeOneDocument,
    updateOneDocument
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

    routes.get('/documents',
        getAllDocuments
    );

    routes.get('/document',
        [
            check('id').isString()
        ],
        (req, res, next) => postCheckValidation(req, res, next),
        (req, res) => getOneDocument(req, res)
    );

    routes.delete('/document',
        [
            check('id').isString()
        ],
        (req, res, next) => postCheckValidation(req, res, next),
        (req, res) => removeOneDocument(req, res)
    );

    routes.put('/document',
        [
            check('id').isString(),
            check('title').isLength({min: 4}),
            check('description').isLength({min: 5}),
            check('content').isLength({min: 5}),
            check('archiveDate').exists({checkNull: false}),
            check('isArchived').exists({checkFalsy: false})
        ],
        (req, res, next) => postCheckValidation(req, res, next),
        (req, res) => updateOneDocument(req, res)
    );

    return routes;
}