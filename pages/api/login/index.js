const microCors = require('micro-cors');
const cors = microCors({ allowMethods: ['POST'] });

export default cors(async (req, res) => {
    const myUsername = 'andrea';
    const myPassword = 'loginApp';
    const { username, password } = await req.body;

    console.log('username', username);
    console.log('password', password);

    if (username === myUsername && myPassword === password) {
        res.status(201).json({ "token": "aaaaa" });
    } else {
        res.status(400).json({ message: 'Credenziali non valide' });
    }
});