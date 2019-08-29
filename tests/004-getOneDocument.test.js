import test from 'tape';
import request from 'supertest';
import {app} from '../src/index';

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 200 and response must match with expected document';

    const postPayload = {
        title: 'New Document' + new Date(),
        description: 'This is a new test document created at : (' + new Date() +')',
        date: new Date(),
        content: 'The content of this document is a test',
        author: 'Oussama Alouat',
        archiveDate: null,
        isArchived: false
    };

    const statusCodeExpected = 200;

    request(app)
        .post('/document')
        .send(postPayload)
        .then((resp) => {
            console.log('inside then')
            const postedDocument= resp.body.data;
            const {_id} = postedDocument;
            const payload = {
                id: _id
            };

            request(app)
                .get(url)
                .send(payload)
                .expect(statusCodeExpected)
                .then((response) => {
                    const document = response.body.data;
                    assert.deepEqual(document, postedDocument, message);
                    assert.end();
                }, (err) => {
                    assert.fail(err.message);
                    assert.end();
                });
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });

});

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 422 and response must match with expected response';

    const expectedResponse = {
        errors: [
            {
                location: "body",
                param: "id",
                msg: "Invalid value"
            }

        ]
    };

    const statusCodeExpected = 422;

    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((response) => {
            const document = response.body;
            assert.deepEqual(document, expectedResponse, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });

});

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 200 and response must match with expected document';

    const expectedDocument = [];

    const payload = {
        id: 'theDocumentWillNotBeAtDatabase'
    };
    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then((response) => {
            const document = response.body.data;
            assert.deepEqual(document, expectedDocument, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });

});
