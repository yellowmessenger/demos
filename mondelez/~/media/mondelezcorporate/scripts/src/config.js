/**
 * Application configuration declaration.
 *
 * This configuration file is shared between the website and the build script so
 * that values don't have to be duplicated across environments. Any non-shared,
 * environment-specific configuration should placed in appropriate configuration files.
 */

require.config({
    // This is just to set a shorter alias for longer paths
    paths: {
        'noext': 'lib-thirdparty/components/requirejs-plugins/src/noext',
        'jquery': 'lib-thirdparty/jquery-1.10.2',
        'jquery-tiny-pubsub': 'lib-thirdparty/components/jquery-tiny-pubsub/src/tiny-pubsub',
        'text': 'lib-thirdparty/components/text/text',
        'handlebars': 'lib-thirdparty/components/handlebars/handlebars'
    },

    // This allows us to set dependencies for third-party libraries that do not follow the RequireJS pattern
    shim: {
        'jquery': { exports: '$' },
        'jquery-tiny-pubsub': { deps: ['jquery'] },
        'handlebars': { exports: 'Handlebars' }
    }
});