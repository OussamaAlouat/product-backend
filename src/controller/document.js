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

const getAllDocuments = (req, res) => {

    const {state} = req.query;

    if (!state) {
        Document.find()
            .then((response) => {
                res.status(200).json({data: response})
            })
    } else {
        const petition = state === 'archived';
        Document.find({isArchived: petition})
            .then((response) => {
                res.status(200).json({data: response})
            })
    }
};

const getOneDocument = (req, res) => {
    const {id} = req.body;
    Document.findById(id)
        .then((result) => {
            res.status(200).json({data: result});
        })
        .catch((err) => {
            res.status(200).json({data: []})
        })
};

const removeOneDocument = (req, res) => {
    const {id} = req.query;
    Document.findByIdAndRemove(id)
        .then((result) => {
            const response = {
                message: 'Document was delete',
                document_id: result._id
            };

            res.status(200).json({response});
        })
        .catch((err) => {
            res.status(200).json({message: 'Document not found'})
        })
};

const updateOneDocument = (req, res) => {
    const {id, title, description, content, archiveDate, isArchived} = req.body;
    Document.findByIdAndUpdate(id, {
        title,
        description,
        content,
        archiveDate,
        isArchived
    }).then((result) => {
        const response = {
            message: "Document updated"
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
    postDocument,
    getAllDocuments,
    getOneDocument,
    removeOneDocument,
    updateOneDocument
}