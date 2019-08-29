import test from 'tape';
import request from 'supertest';
import {app} from '../src/index';

test('-------- Controller: GET /', (assert) => {
    const url = '/hshshshs';
    const message = 'Status must be 404';
    const responseExpected = {status: 404};
    const statusCodeExpected = 404;
    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((res) => {
                assert.deepEqual(res.body, responseExpected, message);
                assert.end();
            }, (err) => {
                assert.fail(err.message);
                assert.end();
            }
        );
});