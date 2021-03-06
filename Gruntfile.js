module.exports = function (grunt) {

    grunt.initConfig({

        // *************************************************************************************
        //      CONFIG OPTIONS
        // *************************************************************************************

        pkg: grunt.file.readJSON('package.json'),

        banner :  '/*   <%= pkg.name  %> <%= pkg.version %> */\n\n/*   <%= pkg.copyright %> */\n\n',

        // *************************************************************************************
        //      CONCAT options
        // *************************************************************************************
        concat: {
            options: {
                banner: '<%= banner %>',
                separator: ';\n'
            },
            vendors:{
                src: [
                    // jQuery & jQuery UI
                    'bower_components/jquery/jquery.js',
                    //'bower_components/jquery-ui/ui/jquery.ui.widget.js',

                    // Backbone & Underscore
                    'bower_components/underscore/underscore.js',
                    //'bower_components/underscore.string/lib/underscore.string.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.localStorage/backbone.localStorage.js',

                    // Twitter Bootstrap
                    'bower_components/bootstrap/js/modal.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    'bower_components/bootstrap/js/button.js',
                    'bower_components/bootstrap/js/dropdown.js'

                ],
                dest: '<%= pkg.target %>/vendors.js'
            },
            js:{
                src: [
                    'js/ui.js',
                    'js/ui-*.js',
                    'js/i18n/EN.js',

                    'js/many.js',
                    'js/many-*.js',
                    'js/one.js',
                    'js/one-*.js',

                    'js/toolbar.js',
                    'js/export.js',
                    'js/filter.js'
                    //'js/ui-models/dico/field.js'
                ],
                dest: '<%= pkg.target %>/evolutility.js'
            }
        },

        // *************************************************************************************
        //      JSHINT options
        // *************************************************************************************
        jshint: {
            dev: [
                // --- tools ---
                'Gruntfile.js',
                'package.json',

                // --- dist ---
                'js/ui*.js',
                'js/i18n/EN.js',

                'js/many*.js',
                'js/one*.js',

                'js/toolbar.js',
                'js/export.js',
                'js/filter.js',
                'js/ui-models/dico/field.js',

                // --- ui models ---
                'js/ui-models/apps/*.js',
                'js/ui-models/test/*.js'

            ]
        },

        // *************************************************************************************
        //      UGLIFY options
        // *************************************************************************************
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: true
            },
            all: {
                files: [
                    {
                        src: '<%= pkg.target %>/evolutility.js',
                        dest: '<%= pkg.target %>/evolutility.min.js'
                    },
                    {
                        src: '<%= pkg.target %>/vendors.js',
                        dest: '<%= pkg.target %>/vendors.min.js'
                    }
                ]
            }
        },

        // *************************************************************************************
        //      LESS
        // *************************************************************************************
        less: {
            options: {
            },
            dev: {
                files: {
                    "dist/css/evolutility.css": "less/evol.less"
                }
            },
            demo: {
                files: {
                    "dist/css/demo.css": "less/demo.less"
                }
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: {
                    "dist/css/evolutility.min.css": "less/evol.less"
                }
            }
        }

    });


    // *************************************************************************************
    //      GRUNT PLUGIN : tasks
    // *************************************************************************************
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');


    // *************************************************************************************
    //      BUILD TASKS : dev prod
    // *************************************************************************************
    // Default task(s).
    grunt.registerTask('default', ['dev']);

    // Dev only task(s).
    grunt.registerTask('dev', ['concat:js', 'less:dev', 'less:demo']);

    // Prod only task(s).
    grunt.registerTask('prod', [
        'jshint',
        'dev',
        'concat:vendors',
        'less:prod',
        'uglify'
    ]);

};

