import test from 'tape';
import request from 'supertest';
import {app} from '../src/index';

test('-------- Controller: PUT /document', (assert) => {

    const getUrl = '/documents';
    const putUrl = '/document';
    const message = 'Status must be 200 and response must match with the expected simple message';

    const responseExpected = {
        message: "Document updated"
    };

    const statusCodeExpected = 200;

    request(app)
        .get(getUrl)
        .expect(statusCodeExpected)
        .then((response) => {
                const documents = response.body.data;
                const documentToUpdate = documents[documents.length - 1];
                const payload = {
                    id: documentToUpdate._id,
                    title: 'Edited on: ' + new Date().getDay(),
                    description: 'This is a new test document',
                    content: 'The content of this document is a test',
                    author: 'Oussama Alouat',
                    archiveDate: new Date(),
                    isArchived: true
                };

                request(app)
                    .put(putUrl)
                    .send(payload)
                    .expect(statusCodeExpected)
                    .then((result) => {
                        assert.deepEqual(result.body, responseExpected, message);
                        assert.end();
                    }, (err) => {
                        assert.fail(err.message);
                        assert.end();
                    });
            }, (err) => {
                assert.fail(err.message);
                assert.end();
            }
        );
});

test('-------- Controller: PUT /document', (assert) => {

    const putUrl = '/document';
    const message = 'Status must be 200 and response must be (Document not found)';
    const responseExpected = {
        message: "Document not found"
    };

    const statusCodeExpected = 200;

    const payload = {
        id: 'ThisIdNotIdentifyAnyDocument',
        title: 'Edited on: ' + new Date().getDay(),
        description: 'This is a new test document',
        content: 'The content of this document is a test',
        author: 'Oussama Alouat',
        archiveDate: new Date(),
        isArchived: true
    };

    request(app)
        .put(putUrl)
        .send(payload)
        .expect(statusCodeExpected)
        .then((result) => {
            assert.deepEqual(result.body, responseExpected, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });

});


test('-------- Controller: PUT /document', (assert) => {

    const getUrl = '/documents';
    const putUrl = '/document';
    const message = 'Status must be 422 and response must match with the expected response';

    const responseExpected = {
        errors: [
            {
                location: "body",
                param: "archiveDate",
                msg: "Invalid value"
            }
        ]
    };

    const statusCodeExpected = 422;

    request(app)
        .get(getUrl)
        .then((response) => {
                const documents = response.body.data;
                const documentToUpdate = documents[documents.length - 1];

                const payload = {
                    id: documentToUpdate._id,
                    title: 'Edited on: ' + new Date().getDay(),
                    description: 'This is a new test document',
                    content: 'The content of this document is a test',
                    author: 'Oussama Alouat',
                    isArchived: true
                };

                request(app)
                    .put(putUrl)
                    .send(payload)
                    .expect(statusCodeExpected)
                    .then((result) => {
                        assert.deepEqual(result.body, responseExpected, message);
                        assert.end();
                    }, (err) => {
                        assert.fail(err.message);
                        assert.end();
                    });
            }, (err) => {
                assert.fail(err.message);
                assert.end();
            }
        );
});
