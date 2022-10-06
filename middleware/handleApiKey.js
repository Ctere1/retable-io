require('dotenv').config();

function getApiKey(req, res, next) {
    const key = process.env.API_KEY
    if (!key) {
        res.status(400).json("Retable-io API KEY not present");
        next()
    } else {
        req.api_key = key;
        next() //proceed to the next action in the calling function
    }
}

module.exports = getApiKey