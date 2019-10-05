const crypto = require("crypto");
const microCors = require('micro-cors');
const cors = microCors({ allowMethods: ['POST'] });
import db from "../../../store/db";

export default cors(async (req, res) => {
    const myUsername = 'andrea';
    const myPassword = 'loginApp';
    const { username, password } = await req.body;

    console.log('username', username);
    console.log('password', password);

    if (username === myUsername && myPassword === password) {
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
