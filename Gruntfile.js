module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//css
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/global-unprefixed.css': 'css/global.scss'
				}
			}
		},
		autoprefixer: {
			files: {
				src: 'css/global-unprefixed.css',
				dest: 'theme/inc/global.css'
			}
		},
		//js
		concat: {
			files: {
				src: ['js/jquery.min.js', 'js/*.js', 'js/scripts.js'],
				dest: 'theme/inc/global.js',
			}
		},
		uglify: {
			files: {
				src: 'theme/inc/global.js',
				dest: 'theme/inc/global.min.js'
			}
		},
		//svg
		svgmin: {
			options: {
				plugins: [
				{ removeViewBox: false },
				{ removeUselessStrokeAndFill: true },
				{ removeXMLProcInst:false }
				]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'svg/',
					src: ['*.svg'],
					dest: 'svg/min/',
				}]
			}
		},
		svgstore: {
			options: {
				prefix : 'icon-',
				svg: {
					style: 'display:none;',
					viewBox: '0 0 32 32',
					version: '1.1',
					xmlns: 'http://www.w3.org/2000/svg',
					'xmlns:xlink': 'http://www.w3.org/1999/xlink'
				},
				cleanup: true
			},
			default: {
				files: {
					'theme/inc/global.svg': ['svg/min/*.svg'],
				}
			}
		},
		//serve
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: 'css/*.scss',
				tasks: ['css'],
			},
			js: {
				files: 'js/*.js',
				tasks: ['js'],
			},
			svg: {
				files: 'svg/*.svg',
				tasks: ['svg'],
			}
		}
	});

	//css
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');

	//js
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//svg
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-svgstore');

	//serve
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('css', ['sass', 'autoprefixer']);
	grunt.registerTask('js', ['concat', 'uglify']);
	grunt.registerTask('svg', ['svgmin', 'svgstore']);
	grunt.registerTask('build', ['css', 'js', 'svg']);
	grunt.registerTask('default', ['build', 'watch']);
};
