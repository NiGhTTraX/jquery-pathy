jquery-pathy
===========

[![Greenkeeper badge](https://badges.greenkeeper.io/NiGhTTraX/jquery-pathy.svg)](https://greenkeeper.io/)


Usage
-----

```javascript
$(".item").path("line", [0, 0, 300, 300]);
```

The above will place the selected items on a straight line from 0x0 to 300x300,
with equal distance between them.


Building
--------

Pathy uses the [Grunt](https://github.com/gruntjs/grunt) build system. To build Pathy, you must have [node.js](https://github.com/joyent/node) installed and then run the following commands:

```bash
# Install the Grunt CLI.
npm install -g grunt-cli

# Clone the repository.
git clone git@github.com:NiGhTTraX/jquery-pathy.git
cd jquery-pathy

# Install node module dependencies.
npm install

# Run the build task.
grunt
```

If all went well, you will find a minified version of the plugin in the ```build/``` folder.


Testing
-------

Run ```grunt test``` to run the tests in [PhantomJS](https://github.com/ariya/phantomjs) or open ```tests/index.html``` to run them in your browser. Tests are written using the [QUnit](http://www.qunitjs.com/) framework and the [jQuery Event Unit Testing Helpers](https://github.com/jquery/jquery-simulate).

To enable coverage, place the ```resources/``` and ```tests/``` folders in your webserver and run the tests from there with the coverage option in QUnit checked (running coverage locally will throw a cross-domain error). Coverage is done using [blanket.js](http://www.blanketjs.org).
