'use strict';

var modRewrite = require('connect-modrewrite');

module.exports = function(grunt){

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || '.',
        dist: 'dist'
    };

    grunt.initConfig({

        myApp: appConfig,
        wiredep: {
            task: {
                src: ['index.html']
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            compass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '{,*/}*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js',
                    'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'css',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: 'img',
                javascriptsDir: 'js',
                fontsDir: 'fonts',
                importPath: './bower_components',
                // httpImagesPath: 'img',
                // httpGeneratedImagesPath: 'img',
                // httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        connect: {
            options: {
                //keepalive: true,
                hostname: 'localhost',
                port: 9001
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use(
                            '/bower_components',
                            connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function () {
        grunt.task.run([
            'wiredep',
            'connect:livereload',
            'watch'
        ]);
    });



};