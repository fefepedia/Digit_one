import * as admin from 'firebase-admin';

const serviceAccount = require('path/to/serviceAccountKey.json');  // Provide the correct path to your Firebase serviceAccountKey.json file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;