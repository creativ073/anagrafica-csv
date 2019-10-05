import env from "../../../utils/env";
import withJwtAuth from "../../../utils/withJwtAuth";
const microCors = require('micro-cors');

const cors = microCors({ allowMethods: ['GET', 'POST'] });
const auth = withJwtAuth(env.seed);

export default auth(cors(async (req, res) => {
    if (req.method === 'GET') {
        res.status(400).json({ error: "Nessun file" });
    } else {
        res.status(400).json({ error: 'File non salvato' });
    }
}));
