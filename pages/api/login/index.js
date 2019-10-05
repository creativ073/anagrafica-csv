export default async (req, res) => {
    const myUsername = 'andrea';
    const myPassword = 'loginApp';
    const { username, password } = await req.body;

    console.log('username', username);
    console.log('password', password);

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${ req.method } Not Allowed`);
    } else if (username === myUsername && myPassword === password) {
        res.status(201).json({ "token": "aaaaa" });
    } else {
        res.status(400).json({ message: 'Credenziali non valide' });
    }
};