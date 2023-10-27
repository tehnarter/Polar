const gulp = require('gulp')

// Tasks
require('./gulp/dev.js')
require('./gulp/build.js')

gulp.task(
	'default',
	gulp.series(
		'clean:dev',
		gulp.parallel(
			'html:dev',
			'sass:dev',
			'ttfToWoff:dev',
			'ttfToWoff2:dev',
			'images:dev',
			'files:dev',
			'js:dev'
		),
		gulp.parallel('browser-sync:dev', 'watch:dev')
	)
)

gulp.task(
	'build',
	gulp.series(
		'clean:build',
		gulp.parallel(
			'html:build',
			'sass:build',
			'images:build',
			'ttfToWoff:build',
			'ttfToWoff2:build',
			'files:build',
			'js:build'
		),
		gulp.parallel('browser-sync:build')
	)
)
