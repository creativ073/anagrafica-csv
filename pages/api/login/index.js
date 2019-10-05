const microCors = require('micro-cors');
const jwt = require('jsonwebtoken');
import env from "../../../utils/env";

const cors = microCors({ allowMethods: ['POST'] });

export default cors(async (req, res) => {
    const { username, password } = await req.body;

    if (username === env.user && password === env.pass) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            username
        }, env.seed);

        res.status(201).json({ token });
    } else {
        res.status(400).json({ message: 'Credenziali non valide' });
    }
});
