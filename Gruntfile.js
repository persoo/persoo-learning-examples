module.exports = function (grunt) {
	//file types to copy from scr/main to target
	var copyFileTypes = ['json','css','js','jpg','gif','png'];
	
	// Project configuration.    
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),    
	          
	    clean: ["target", "common", "solutions", "excercises"],	    
	    concat: {
	        demoAllCss: {
	            src: [
	                  'src/lib/bootstrap/css/bootstrap.min.css',
	                  'src/main/demo-navigation.css'
	            ],
	            dest: 'common/demo-all.css'
	        },
	        demoAllJS: {
	            src: [
	                  'src/lib/jquery/jquery-1.9.1.min.js',
	                  'src/lib/bootstrap/js/bootstrap.min.js',   // depends on jQuery
	                  'src/main/demo-nav-config.js',
	                  'src/main/demo-navigation.js'       // depends on persoo-debug, demo-nav-config
	            ],
	            dest: 'common/demo-all.js'
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
	  		files: ['<%= jshint.files %>', 'src/main/**'],
	  		tasks: ['default', 'test']
		},
	
		//
		// Demo and deployment
		//
		copy: {
		    srcToSolutionsDir:{
		        files: [
		                {expand: true, cwd:'src/main',
		                    src: ['*/*'],
		                    dest: 'solutions/'},
		                {expand: true, cwd:'src/main',
		                    src: ['demo-nav-config.js', 'demo-navigation.js', 'demo-navigation.css', 'index.html'],
		                    dest: 'solutions/'},
	                    {expand: true, cwd:'src/lib',
	                        src: ['jquery/**', 'bootstrap/**'],
	                        dest: 'solutions/'},                        
	                    {expand: true, cwd:'common',
	                        src: ['demo-all.js', 'demo-all.css', 'debug-console/**'],
	                        dest: 'solutions/'}
	                   ]
		    },
		    srcToExcercisesDir:{
		        files: [
		                {expand: true, cwd:'src/main',
		                    src: ['*/*'],
		                    dest: 'excercises/'},
		                {expand: true, cwd:'src/main',
		                    src: ['demo-nav-config.js', 'demo-navigation.js', 'demo-navigation.css', 'index.html'],
		                    dest: 'excercises/'},
	                    {expand: true, cwd:'src/lib',
	                        src: ['jquery/**', 'bootstrap/**'],
	                        dest: 'excercises/'},                        
	                    {expand: true, cwd:'common',
	                        src: ['demo-all.js', 'demo-all.css', 'debug-console/**'],
	                        dest: 'excercises/'}
	                   ]
		    }		    
		},
	});

    // Load the plugin that provides tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-exec');
   
    grunt.registerTask('default', [ 'build' ]);  // Default task(s).
        
    grunt.registerTask('build', [
                                   'concat',
                                   'copy:srcToSolutionsDir', 'copy:srcToExcercisesDir'                                  
                                  ]);

    grunt.registerTask('test', ['build', 'jshint', /* 'qunit' */]);

//    grunt.registerTask('local', ['setTarget:local', 'build']);
//    grunt.registerTask('production', ['setTarget:production', 'build']);
};
