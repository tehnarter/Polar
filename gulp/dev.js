const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const panini = require('panini')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const changed = require('gulp-changed')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./dev/')) {
		return gulp.src('./dev/', { read: false }).pipe(clean({ force: true }))
	}
	done()
})

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
}

const plumberNotify = title => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	}
}
const setPanini = {
	root: 'src/html/',
	layouts: 'src/html/layouts',
	partials: 'src/html/blocks',
	data: 'src/html/data',
}

gulp.task('html:dev', function () {
	panini.refresh()
	return gulp
		.src([
			'./src/html/**/*.html',
			'!./src/html/layouts/*.html',
			'!./src/html/blocks/*.html',
		])
		.pipe(changed('./dev/', { hasChanged: changed.compareContents }))
		.pipe(panini(setPanini))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(gulp.dest('./dev/'))
		.pipe(browserSync.stream())
})

gulp.task('sass:dev', function () {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./dev/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./dev/css/'))
		.pipe(browserSync.stream())
})

gulp.task('images:dev', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./dev/img/'))
		.pipe(gulp.dest('./dev/img/'))
		.pipe(browserSync.stream())
})

gulp.task('ttfToWoff:dev', function () {
	return gulp
		.src('src/fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(gulp.dest('./dev/fonts'))
		.pipe(browserSync.stream())
})

gulp.task('ttfToWoff2:dev', function () {
	return gulp
		.src('src/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(gulp.dest('./dev/fonts'))
		.pipe(browserSync.stream())
})

gulp.task('files:dev', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./dev/files/'))
		.pipe(gulp.dest('./dev/files/'))
		.pipe(browserSync.stream())
})

gulp.task('js:dev', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./dev/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./dev/js/'))
		.pipe(browserSync.stream())
})

gulp.task('browser-sync:dev', function () {
	browserSync.init({
		server: {
			baseDir: './dev/',
		},
	})
})
gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'))
	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'))
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'))
	gulp.watch('./src/fonts/**/*', gulp.parallel('ttfToWoff:dev'))
	gulp.watch('./src/fonts/**/*', gulp.parallel('ttfToWoff2:dev'))
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'))
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'))
})
