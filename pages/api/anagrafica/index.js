import env from "../../../utils/env";
import db from "../../../utils/db";
import jwtAuth from "../../../utils/jwtAuth";

const microCors = require('micro-cors');
const cors = microCors({ allowMethods: ['GET'] });
const auth = jwtAuth(env.seed);

// noinspection JSUnusedGlobalSymbols
export default auth(cors(async (req, res) => {
    res.status(200).json({
        "anagrafica": db.get('anagrafica').value()
    });
}));