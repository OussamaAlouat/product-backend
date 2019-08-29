import test from 'tape';
import request from 'supertest';
import {app} from '../src/index';

test('-------- Controller: Get /documents', (assert) => {
    const url = '/documents';
    const message = 'Status must be 200 and response must contains some Documents';


    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((response) => {
            const documents = response.body.data;
            assert.equal(documents.length > 0, true, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });
});

test('-------- Controller: Get (get all archived documents) /documents', (assert) => {
    const url = '/documents?state=archived';
    const message = 'Status must be 200 and response must contains some Documents';
    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((response) => {
            const documents = response.body.data;
            const notArchived = documents.some((val) => val.isArchived === false);
            const actualResponse = notArchived !== true && documents.length > 0;
            assert.equal(actualResponse, true, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });
});

test('-------- Controller: Get (get all new documents) /documents', (assert) => {
    const url = '/documents?state=new';
    const message = 'Status must be 200 and response must contains some Documents';
    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((response) => {
            const documents = response.body.data;
            const archived = documents.some((val) => val.isArchived === true);
            const actualResponse = archived !== true && documents.length > 0;
            assert.equal(actualResponse, true, message);
            assert.end();
        }, (err) => {
            assert.fail(err.message);
            assert.end();
        });
});