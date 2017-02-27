# AsyncAwaitPlayground

New async/await provides really clean stack traces
-----

```code
# node index.js
Great job, everyone...
Example app listening on port 3000!
Error: qwerty
    at getError (/vagrant/nodejs/async_await.js:6:11)
    at ServiceTwo.load (/vagrant/nodejs/async_await.js:22:22)
    at ServiceOne.load (/vagrant/nodejs/async_await.js:31:30)
    at AsyncTest.qwerty (/vagrant/nodejs/async_await.js:41:43)
    at Layer.handle [as handle_request] (/vagrant/nodejs/node_modules/express/lib/router/layer.js:95:5)
    at next (/vagrant/nodejs/node_modules/express/lib/router/route.js:131:13)
    at Route.dispatch (/vagrant/nodejs/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/vagrant/nodejs/node_modules/express/lib/router/layer.js:95:5)
    at /vagrant/nodejs/node_modules/express/lib/router/index.js:277:22
    at Function.process_params (/vagrant/nodejs/node_modules/express/lib/router/index.js:330:12)
```