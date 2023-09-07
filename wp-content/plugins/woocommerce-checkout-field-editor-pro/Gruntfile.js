'use strict';

module.exports = function(grunt) {
	// auto load grunt tasks
	//require( 'load-grunt-tasks' )( grunt );
	
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
		plugin: 'thwcfe',
		dirs: {
			admin: {
				js: 'admin/assets/js',
				css: 'admin/assets/css'
			},
			public: {
				js: 'public/assets/js',
				css: 'public/assets/css'
			}
		},

        concat: {
            admin: {
                src: ['<%= dirs.admin.js %>/inc/**/*.js'],
                dest: '<%= dirs.admin.js %>/<%= plugin %>-admin.js',
            },
			checkout: {
                src: ['<%= dirs.public.js %>/inc/common/*.js', '<%= dirs.public.js %>/inc/thwcfe-checkout.js'],
                dest: '<%= dirs.public.js %>/<%= plugin %>-public-checkout.js',
            },
            myaccount: {
                src: ['<%= dirs.public.js %>/inc/common/*.js', '<%= dirs.public.js %>/inc/thwcfe-myaccount.js'],
                dest: '<%= dirs.public.js %>/<%= plugin %>-public-myaccount.js',
            },
            userprofile: {
                src: ['<%= dirs.public.js %>/inc/common/thwcfe-public-file-upload.js', '<%= dirs.public.js %>/inc/thwcfe-userprofile.js'],
                dest: '<%= dirs.public.js %>/<%= plugin %>-userprofile.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
					'<%= dirs.admin.js %>/<%= plugin %>-admin.min.js': ['<%= dirs.admin.js %>/<%= plugin %>-admin.js'],
					'<%= dirs.public.js %>/<%= plugin %>-public-checkout.min.js': ['<%= dirs.public.js %>/<%= plugin %>-public-checkout.js'],
                    '<%= dirs.public.js %>/<%= plugin %>-public-myaccount.min.js': ['<%= dirs.public.js %>/<%= plugin %>-public-myaccount.js'],
                    '<%= dirs.public.js %>/<%= plugin %>-userprofile.min.js': ['<%= dirs.public.js %>/<%= plugin %>-userprofile.js']
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
					'<%= dirs.admin.css %>/<%= plugin %>-admin.min.css': ['<%= dirs.admin.css %>/<%= plugin %>-admin.css'],
					'<%= dirs.public.css %>/<%= plugin %>-public.min.css': ['<%= dirs.public.css %>/<%= plugin %>-public.css']
                }
            }
        },
        
        watch: {
            css: {
                files: ['<%= dirs.admin.css %>/<%= plugin %>-admin.css', '<%= dirs.public.css %>/<%= plugin %>-public.css'], // which files to watch
                tasks: ['cssmin']
            },
            js: {
                files: ['<%= dirs.admin.js %>/inc/**/*.js', '<%= dirs.public.js %>/inc/**/*.js'], // which files to watch
                tasks: ['concat', 'uglify']
            }
        }
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.registerTask('dist', ['clean', 'copy']);
	grunt.registerTask('default', ['watch']);

};
