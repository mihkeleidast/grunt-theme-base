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
				src: 'src/css/global-unprefixed.css',
				dest: 'app/static/inc/global.min.css'
			},
			theme: {
				src: 'src/css/global-unprefixed.css',
				dest: 'app/theme/inc/global.min.css'
			}
		},
		//js
		import: {
			static: {
				src: 'src/js/global.js',
				dest: 'app/static/inc/js/global.js',
			},
			theme: {
				src: 'src/js/global.js',
				dest: 'app/theme/inc/js/global.js',
			}
		},
		uglify: {
			static: {
				src: 'app/static/inc/js/global.js',
				dest: 'app/static/inc/js/global.min.js'
			},
			theme: {
				src: 'app/theme/inc/js/global.js',
				dest: 'app/theme/inc/js/global.min.js'
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
			css_static: {
				files: 'src/css/*.scss',
				tasks: ['css-static'],
			},
			js_static: {
				files: 'src/js/*.js',
				tasks: ['js-static'],
				options: {
					livereload: true,
				},
			},
			svg_static: {
				files: 'src/svg/*.svg',
				tasks: ['svg-static'],
				options: {
					livereload: true,
				},
			},
			fonts_static: {
				files: 'src/fonts/*',
				tasks: ['copy:static'],
				options: {
					livereload: true,
				},
			},
			img_static: {
				files: 'src/img/*.{png,jpg,svg}',
				tasks: ['newer:imagemin:static'],
				options: {
					livereload: true,
				},
			},
			html_static: {
				files: 'app/static/*.html',
				options: {
					livereload: true,
				},
			},
			css_theme: {
				files: 'src/css/*.scss',
				tasks: ['css-theme'],
				options: {
					livereload: true,
				},
			},
			js_theme: {
				files: 'src/js/*.js',
				tasks: ['js-theme'],
				options: {
					livereload: true,
				},
			},
			svg_theme: {
				files: 'src/svg/*.svg',
				tasks: ['svg-theme'],
				options: {
					livereload: true,
				},
			},
			fonts_theme: {
				files: 'src/fonts/*',
				tasks: ['copy:theme'],
				options: {
					livereload: true,
				},
			},
			img_theme: {
				files: 'src/img/*.{png,jpg,svg}',
				tasks: ['newer:imagemin:static'],
				options: {
					livereload: true,
				},
			}
		},
		focus: {
			static: {
				include: ['css_static', 'js_static', 'svg_static', 'fonts_static', 'img_static', 'html_static'],
			},
			theme: {
				include: ['css_theme', 'js_theme', 'svg_theme', 'fonts_theme', 'img_theme'],
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-focus');

	//serve
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('css-theme', ['sass', 'autoprefixer:theme']);
	grunt.registerTask('js-theme', ['import:theme', 'uglify:theme']);
	grunt.registerTask('svg-theme', ['svgmin', 'svgstore:theme']);
	grunt.registerTask('build-theme', ['css-theme', 'js-theme', 'svg-theme', 'copy:theme', 'newer:imagemin:static']);
	grunt.registerTask('theme', ['build-theme', 'focus:theme']);

	grunt.registerTask('css-static', ['sass', 'autoprefixer:static']);
	grunt.registerTask('js-static', ['import:static', 'uglify:static']);
	grunt.registerTask('svg-static', ['svgmin', 'svgstore:static']);
	grunt.registerTask('build-static', ['css-static', 'js-static', 'svg-static', 'copy:static', 'newer:imagemin:theme']);
	grunt.registerTask('static', ['build-static', 'connect', 'focus:static']);

	grunt.registerTask('default', ['static']);
};
