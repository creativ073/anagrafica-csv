import env from "../../../utils/env";
import db from "../../../utils/db";
const jwtAuth = require('micro-jwt-auth');
const microCors = require('micro-cors');

const cors = microCors({ allowMethods: ['GET', 'POST'] });
const auth = jwtAuth(env.seed);

export default auth(cors(async (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json({
            "csv": db.get('csv').value()
        });
    } else {
        res.status(400).json({ error: 'File non salvato' });
    }
}));
