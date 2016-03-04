module.exports = function(config) {

  var wiredep = require('wiredep');
  var bowerFiles = wiredep({devDependencies: true}).js;

  config.set({

		basePath: './',

		frameworks: ['jasmine', 'angular-filesort'],

	  angularFilesort: {
		  whitelist: [
			  'app/**/*.js',
        '!app/**/*.spec.js'
		  ]
	  },

		files: bowerFiles.concat([
			'app/**/*.js'
		]),

		exclude: [
		],

		preprocessors: {
			"app/**/*.js": ["coverage"]
		},

		reporters: ["mocha", "coverage"],

		port: 9876,

		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: true,

		browsers: ['PhantomJS'],

		singleRun: false
  })
}
