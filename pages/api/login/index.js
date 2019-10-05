const crypto = require("crypto");
const microCors = require('micro-cors');
require('dotenv').config();
import db from "../../../store/db";

const cors = microCors({ allowMethods: ['POST'] });

export default cors(async (req, res) => {
    const { username, password } = await req.body;

    if (username === process.env.USER && password === process.env.PASS) {
        const token = crypto.randomBytes(8).toString('hex');
        const expire = Date.now() + (20 * 60 * 1000);

        db.get('user')
            .assign({ token, expire })
            .write();

        res.status(201).json({ token });
    } else {
        res.status(400).json({ message: 'Credenziali non valide' });
    }
});
