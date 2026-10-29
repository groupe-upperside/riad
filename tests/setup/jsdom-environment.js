const JSDOMEnvironment = require('jest-environment-jsdom').default;

const NODE_GLOBALS = [
    'Request',
    'Response',
    'Headers',
    'fetch',
    'ReadableStream',
    'WritableStream',
    'TransformStream',
    'TextEncoder',
    'TextDecoder',
    'structuredClone',
    'Blob',
    'FormData',
];

module.exports = class NextJsdomEnvironment extends JSDOMEnvironment {
    constructor(config, context) {
        super(config, context);
        for (const name of NODE_GLOBALS) {
            if (typeof this.global[name] === 'undefined' && typeof globalThis[name] !== 'undefined') {
                this.global[name] = globalThis[name];
            }
        }
    }
};
