import test from 'tape';
import db from '../src/db';

test.onFinish(() => {
    db.disconnect();
    process.exit(0);
});