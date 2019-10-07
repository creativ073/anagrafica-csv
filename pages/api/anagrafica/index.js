import env from "../../../utils/env";
import db from "../../../utils/db";
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
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
        const form = new formidable.IncomingForm();
        const uploadPath = path.join(process.cwd() + "/uploads/tmp");
        console.log("uploadPath", uploadPath);

        form.uploadDir = uploadPath;

        /**
         * @param files
         * @param files.csv
         */
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log("err", err);

                res.status(400).json({
                    "error": "Errore caricamento file"
                });
            } else {
                if (!files.csv) {
                    res.status(400).json({
                        "error": "File non caricato"
                    });
                } else {
                    const { csv } = files;
                    const time = new Date();
                    const fileId = time.getTime();
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                    const fileDate = time.toLocaleDateString('it-IT', options);
                    const fileName = fileId + ".csv";

                    fs.rename(csv.path, "./uploads/" + fileName, (err) => {
                        // Rest of your code
                        if (err) {
                            console.log("err", err);
                            res.status(400).json({
                                "error": "File non salvato"
                            });
                        } else {
                            db.get('csv')
                                .push({ id: fileId, date: fileDate})
                                .write();
                            res.status(201).json({
                                "info": {
                                    "id": 1,
                                    "time": Date.now(),
                                    "name": fileName
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}));

export const config = {
    api: {
        bodyParser: false
    }
};