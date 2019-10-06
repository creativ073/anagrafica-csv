import env from "../../../utils/env";
import db from "../../../utils/db";
const fs = require('fs');
const path = require('path');
const jwtAuth = require('micro-jwt-auth');
const microCors = require('micro-cors');

const cors = microCors({ allowMethods: ['GET'] });
const auth = jwtAuth(env.seed);

export default auth(cors(async (req, res) => {
    const { query: { id } } = req;
    const { id: fileId } = db.get('csv')
        .find({ id: id * 1 })
        .value();

    if (fileId) {
        const filePath = path.join(process.cwd() + "/uploads/" + fileId + ".csv");

        fs.readFile(filePath, (err, data) => {
            // Rest of your code
            if (err) {
                console.log("err", err);
                res.status(400).json({
                    "error": "File non accessibile"
                });
            } else {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename=' + fileId + '.csv');
                res.status(200).send(data);
            }
            console.log('File sent');
        });
    } else {
        console.log("id", id);
        console.log("fileId", fileId);

        res.status(400).json({
            "error": "File non trovato"
        });
    }
}));