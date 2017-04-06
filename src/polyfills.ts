import 'ie-shim'; // Internet Explorer 9 support
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

if (!PROD_ENV) {
    require('zone.js/dist/long-stack-trace-zone');
}
