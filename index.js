'use strict';

const rp = require('request-promise');
const ar = require('async-request');
const express = require('express');

let getError = async () => {
    throw new Error('qwerty');
};

let requestPromiseError = async () => {
    return await rp({url: 'http://localhost:3000/at'});
};

let asyncRequestError = async () => {
    return await ar('http://localhost:3000/at');
};

let getData = async () => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {resolve('Great job, everyone...');}, 500);
    });
};

class ServiceTwo {
    async produceError() {
        return await getError();
    }
    async produceRpError() {
        return await requestPromiseError();
    }
    async produceArError() {
        return await asyncRequestError();
    }
}

class ServiceOne {
    constructor(service) {
        this.__service = service;
    }
    async produceError() {
        return await this.__service.produceError();
    }
    async produceRpError() {
        return await this.__service.produceRpError();
    }
    async produceArError() {
        return await this.__service.produceArError();
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
    async produceRpError(req, res, next) {
        try {
            res.send(await this.__service.produceRpError());
        } catch(e) {
            console.error(e);
            res.status(500).json(e);
        }
    }
    async produceArError(req, res, next) {
        try {
            res.json(await this.__service.produceArError());
        } catch(e) {
            console.error(e);
            res.status(500).json(e);
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

    const app = express();

    app.get('/', async function (req, res) {
        res.send(await getData());
    });

    app.get('/at', asyncTest.produceError.bind(asyncTest));
    app.get('/rp', asyncTest.produceRpError.bind(asyncTest));
    app.get('/ar', asyncTest.produceArError.bind(asyncTest));

    app.use((error, req, res, next) => console.error(error.stack()));

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

})();
