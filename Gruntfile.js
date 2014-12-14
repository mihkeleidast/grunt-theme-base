module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//css
		sass: {
			all: {
				options: {
					style: 'compressed'
				},
				files: {
					'src/css/global-unprefixed.css': 'src/css/global.scss'
				}
			}
		},
		autoprefixer: {
			static: {
				files: {
					src: 'src/css/global-unprefixed.css',
					dest: 'app/static/inc/global.min.css'
				}
			},
			theme: {
				files: {
					src: 'src/css/global-unprefixed.css',
					dest: 'app/theme/inc/global.min.css'
				}
			}
		},
		//js
		import: {
			static: {
				src: 'src/js/global.js',
				dest: 'app/static/js/global.js',
			},
			theme: {
				src: 'src/js/global.js',
				dest: 'app/theme/js/global.js',
			}
		},
		uglify: {
			static: {
				files: {
					src: 'static/inc/js/global.js',
					dest: 'static/inc/js/global.min.js'
				}
			},
			theme: {
				files: {
					src: 'theme/inc/js/global.js',
					dest: 'theme/inc/js/global.min.js'
				}
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
			all: {
				files: [{
					expand: true,
					cwd: 'src/svg/',
					src: ['*.svg'],
					dest: 'src/svg/min/',
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
			static: {
				files: {
					'app/static/inc/global.svg': ['src/svg/min/*.svg'],
				}
			},
			theme: {
				files: {
					'app/theme/inc/global.svg': ['src/svg/min/*.svg'],
				}
			}
		},
		//serve
		watch: {
			options: {
				livereload: true,
			},
			static: {
				css: {
					files: 'src/css/*.scss',
					tasks: ['css-static'],
				},
				js: {
					files: 'src/js/*.js',
					tasks: ['js-static'],
				},
				svg: {
					files: 'src/svg/*.svg',
					tasks: ['svg-static'],
				},
				fonts: {
					files: 'src/fonts/*',
					tasks: ['copy:static'],
				},
				img: {
					files: 'src/img/*.{png,jpg,svg}',
					tasks: ['newer:imagemin:static'],
				}
			},
			theme: {
				css: {
					files: 'src/css/*.scss',
					tasks: ['css-theme'],
				},
				js: {
					files: 'src/js/*.js',
					tasks: ['js-theme'],
				},
				svg: {
					files: 'src/svg/*.svg',
					tasks: ['svg-theme'],
				},
				fonts: {
					files: 'src/fonts/*',
					tasks: ['copy:theme'],
				},
				img: {
					files: 'src/img/*.{png,jpg,svg}',
					tasks: ['newer:imagemin:static'],
				}
			}
		},
		connect: {
			options: {
				port: 1337,
				hostname: 'localhost',
				base: 'app/static'
			},
			server: {
				options: {
					livereload: true,
					open: true,
				}
			}
		},
		//fonts
		copy: {
			static: {
				src: 'src/fonts/*',
				dest: 'app/static/inc/fonts/',
			},
			theme: {
				src: 'src/fonts/*',
				dest: 'app/theme/inc/fonts/',
			},
		},
		//images
		imagemin: {
			static: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**/*.{png,jpg,svg}'],
					dest: 'app/static/inc/img/'
				}]
			},
			theme: {
				files: [{
					expand: true,
					cwd: 'src/img',
					src: ['**/*.{png,jpg,svg}'],
					dest: 'app/theme/inc/img/'
				}]
			}
		}
	});

	//css
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');

	//js
	grunt.loadNpmTasks('grunt-import');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//svg
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-svgstore');

	//images
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');

	//serve
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('css-theme', ['sass', 'autoprefixer:theme']);
	grunt.registerTask('js-theme', ['import:theme', 'uglify:theme']);
	grunt.registerTask('svg-theme', ['svgmin', 'svgstore:theme']);
	grunt.registerTask('build-theme', ['css-theme', 'js-theme', 'svg-theme', 'copy:theme', 'newer:imagemin:static']);
	grunt.registerTask('theme', ['build-theme', 'watch:theme']);

	grunt.registerTask('css-static', ['sass', 'autoprefixer:static']);
	grunt.registerTask('js-static', ['import:static', 'uglify:static']);
	grunt.registerTask('svg-static', ['svgmin', 'svgstore:static']);
	grunt.registerTask('build-static', ['css-static', 'js-static', 'svg-static', 'copy:static', 'newer:imagemin:theme']);
	grunt.registerTask('static', ['build-static', 'connect', 'watch:static']);

	grunt.registerTask('default', ['static']);
};
