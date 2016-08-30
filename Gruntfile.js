module.exports = function (grunt) {
	//file types to copy from scr/main to target
	var copyFileTypes = ['json','css','js','jpg','gif','png'];

	// Project configuration.
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    clean: ["target", "common", "solutions", "excercises", "fonts"],
	    concat: {
	        demoAllCss: {
	            src: [
	                  'src/lib/bootstrap/css/bootstrap.min.css',
	                  'src/main/demo-navigation.css',
										'src/main/frytol.css'
	            ],
	            dest: 'common/persoo-demo-all.css'
	        },
	        demoAllJS: {
	            src: [
	                  'src/lib/jquery/jquery-1.9.1.min.js',
	                  'src/lib/bootstrap/js/bootstrap.min.js',   // depends on jQuery
	                  'src/main/demo-nav-config.js',
	                  'src/main/demo-navigation.js',       // depends on persoo-debug, demo-nav-config
										'src/main/fixed-navigation.js',
	                  'src/lib/templateRendering/persooEJS.js',
	                  'src/lib/persooUtils.js',
	                  'src/lib/productsDB.js'
	            ],
	            dest: 'common/persoo-demo-all.js'
	        }
	    },
		jshint: {
	  		files: [
	  		        'gruntfile.js',
	  		        //'src/main/*.js',
	  		        //'src/main/*/*.js',
	  		        'src/test/*.js'
	  		        ],
	  		options: {
		        // options here to override JSHint defaults
		        globals: {
		        	//jQuery: true,
		        	console: true,
		        	module: true,
		        	document: true
		        }
		}
		},
		watch: {
	  		files: ['<%= jshint.files %>', 'src/**'],
	  		tasks: ['default', 'test']
		},

		//
		// Demo and deployment
		//
		copy: {
			srcToCommonDir:{
		        files: [
		                {expand: true, cwd:'src/main',
		                    src: [],
		                    dest: 'common/'},
	                    {expand: true, cwd:'src/lib',
	                        src: ['jquery/**', 'bootstrap/**'],
	                        dest: 'common/'},
	                    {expand: true, cwd:'src/',
		                    src: ['img/**'],
		                    dest: 'common/'}
	                   ]
		    },
			srcToFontsDir:{
		        files: [
	                    {expand: true, cwd:'src/lib/bootstrap',
	                        src: ['fonts/**'],
	                        dest: '.'},
	                   ]
		    },
		    srcToSolutionsDir:{
		        files: [
		                {expand: true, cwd:'src/main',
		                    src: ['*/*'],
		                    dest: 'solutions/'},
		                {expand: true, cwd:'src/main',
		                    src: ['index.html'],
		                    dest: 'solutions/'},
				        {expand: true, cwd:'src/',
				            src: ['globalConfig.js'],
				            dest: 'solutions/'}
	                   ]
		    },
		    srcToExcercisesDir:{
		        files: [
		                {expand: true, cwd:'src/main',
		                    src: ['*/*'],
		                    dest: 'excercises/'},
		                {expand: true, cwd:'src/main',
		                    src: ['index.html'],
		                    dest: 'excercises/'},
			            {expand: true, cwd:'src/',
			                src: ['globalConfig.js'],
			                dest: 'excercises/'}
	                   ]
		    }
		},
		mysed: {
		    removeSolutionForExcercises: {
		    	files: "excercises/**",
		    	path: 'excercises',
		        pattern: 'persooSolutionStart.*persooSolutionEnd',
		        replacement: 'place for your code',
		        multiline: true,
		        recursive: true
		    }
		},
		sed: {
		    removeSolutionForExcercises: {
		    	files: "excercises/**",
		    	path: 'excercises',
		        pattern: 'persooSolutionStartM.*persooSolutionEndM',
		        replacement: 'place for your code',
		        multiline: true,
		        recursive: true
		    }
		}

	});

	// FIXME commit update to sed plugin (add options for multiline, ignoreCase
	var replace = require('replace')
    , _ = grunt.util._
    , log = grunt.log;
	grunt.registerMultiTask('mysed', 'Search and replace.', function() {
	    var data = this.data;

	    if (!data.pattern) {
	      log.error('Missing pattern property.');
	      return;
	    }

	    if (_.isUndefined(data.replacement)) {
	      log.error('Missing replacement property.');
	      return;
	    }

	    data.path = data.path || '.';

	    replace({
	      regex: data.pattern
	    , replacement: data.replacement
	    , paths: _.isArray(data.path) ? data.path : [data.path]
	    , recursive: data.recursive
	    , quiet: grunt.option('verbose') ? false : true
	    , silent: false
	    , async: false
	    , multiline: data.multiline
	    , ignoreCase: false
	    });
	});

    // Load the plugin that provides tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [ 'build' ]);  // Default task(s).

    grunt.registerTask('build', [
                                   'concat',
                                   'copy:srcToCommonDir',
                                   'copy:srcToFontsDir',
                                   'copy:srcToSolutionsDir',
                                   'copy:srcToExcercisesDir',
                                   'mysed', 'sed'
                                  ]);

    grunt.registerTask('test', ['build', 'jshint', /* 'qunit' */]);

//    grunt.registerTask('local', ['setTarget:local', 'build']);
//    grunt.registerTask('production', ['setTarget:production', 'build']);
};
