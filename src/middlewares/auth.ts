import admin from 'C:/Users/Stefan/Digit_one/src/routes/inventoryRoutes'; 

export async function verifyToken(req, res, next) {
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (e) {
        res.status(401).send('Invalid token');
    }
}
