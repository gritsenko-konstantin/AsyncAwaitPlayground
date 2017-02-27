'use strict';

const express = require('express');

let getError = async () => {
    throw new Error('qwerty');
}

let getData = async () => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve('Great job, everyone...');
        }, 500);
    });
};

class ServiceTwo {
    async produceError() {
        return await getError();
    }
}

class ServiceOne {
    constructor(service) {
        this.__service = service;
    }
    async produceError() {
        await this.__service.produceError();
    }
}

class AsyncTest {
    constructor(service) {
        this.__service = service;
    }
    async produceError(req, res, next) {
        try {
            res.send(await this.__service.produceError());
        } catch(e) {
            console.error(e);
            res.status(500).json({});
        }
    }
}

(async () => {
    const asyncTest = new AsyncTest(
        new ServiceOne(
            new ServiceTwo()
        )
    );
console.log(await getData());

var app = express();

app.get('/', async function (req, res) {
    res.send(await getData());
});

app.get('/at', asyncTest.produceError.bind(asyncTest));

app.use((error, req, res, next) => console.error(error.stack()));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

})();
