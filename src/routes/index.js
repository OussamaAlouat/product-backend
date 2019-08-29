import {Router} from 'express';
import {index} from '../controller'
import {
    getAllDocuments,
    getOneDocument,
    postDocument,
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

    routes.post('/document',
        [
            check('title').isLength({min: 4}),
            check('description').isLength({min: 5}),
            check('date').exists(),
            check('content').isLength({min: 5}),
            check('author').isLength({min: 5}),
            check('archiveDate').exists({checkNull: false}),
            check('isArchived').exists({checkFalsy: false})
        ],
        (req, res, next) => postCheckValidation(req, res, next),
        (req, res) => postDocument(req, res));

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