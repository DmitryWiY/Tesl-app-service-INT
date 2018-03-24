let express = require('express');
let router = express.Router();

let rp = require('request-promise');



/* GET users listing. */
router.get('/', (req, res, next) => {
    res.json({data: 'new batch response'});
});

router.post('/', (req, res, next) => {
    let method = req.body.meta.verb;
    let url = req.body.meta.url;
    let payload = req.body.payload;
    switch (method) {
        case 'GET':
            handleGet({method, url}).then(data => res.json({data}));
            break;
        case 'POST':
            handlePOST({method, url, payload}).then(data => {
                res.json(data)
            });
            break;
        case 'PATCH':
            handlePATCH({method, url, payload}).then(data => {
                res.json(data)
            });
    }
});

function handleGet({method, url}) {
    let options = {
        url: url,
        method: method
    };

    return rp(options)
        .then((data) => {
            return JSON.parse(data);
        })
        .catch((err) => {
            throw (err);
        });
}

function handlePOST({method, url, payload}) {
    let promises = payload.map(el => {
        let options = {
            url: url,
            method: method,
            body: el,
            json: true
        };
        return rp(options)
    });

    return Promise.all(promises.map((q, i) => handleSinglePromise(q, i))).then((results) => {
        // we can filter out any promise we want to
        // return results.filter(x => x.status === "resolved");
        return results;
    });

}


function handlePATCH({method, url, payload}) {
    let promises = payload.map(el => {
        // rejects all because of some param is wrong
        // did not have time to research
        let body = Object.assign({}, el);
        delete body['id'];
        let options = {
            qs: {
                userId: el.id
            },
            url: url,
            method: method,
            body: el,
            json: true
        };
        return rp(options)
    });

    return Promise.all(promises.map((q, i) => handleSinglePromise(q, i))).then((results) => {
        // we can filter out any promise we want to
        // return results.filter(x => x.status === "resolved");
        return results;
    });

}

function handleSinglePromise(promise, index) {
    return promise.then(v => {
            return {index: index, status: "resolved"}
        },
        function (e) {
            return {index: index, status: "rejected"}
        });
}


module.exports = router;
