const gulp = require('gulp')

// HTML
const fileInclude = require('gulp-file-include')
const htmlclean = require('gulp-htmlclean')
// const webpHTML = require('gulp-webp-html')
const panini = require('panini')

// SASS
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
// const webpCss = require('gulp-webp-css')

const browserSync = require('browser-sync')
const clean = require('gulp-clean')
const fs = require('fs')
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const changed = require('gulp-changed')
const ttf2woff = require('gulp-ttf2woff').default
const ttf2woff2 = require('gulp-ttf2woff2')

// Images
const webp = require('gulp-webp')

gulp.task('clean:build', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp.src('./build/', { read: false }).pipe(clean({ force: true }))
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
	layouts: 'src/html/layouts',
	partials: 'src/html/blocks/*.html',
	data: 'src/html/data/*.{json,yml}',
}

gulp.task('html:build', function () {
	return (
		gulp
			.src([
				'./src/html/**/*.html',
				'!./src/html/layouts/*.html',
				'!./src/html/blocks/*.html',
			])
			.pipe(changed('./build/'))
			.pipe(panini(setPanini))
			.pipe(plumber(plumberNotify('HTML')))
			// .pipe(webpHTML())
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(htmlclean())
			.pipe(gulp.dest('./build/'))
	)
})

gulp.task('sass:build', function () {
	return (
		gulp
			.src('./src/scss/*.scss')
			.pipe(changed('./build/css/'))
			.pipe(plumber(plumberNotify('SCSS')))
			// .pipe(webpCss())
			.pipe(sassGlob())
			.pipe(autoprefixer())
			.pipe(groupMedia())
			.pipe(sass())
			.pipe(csso())
			.pipe(gulp.dest('./build/css/'))
	)
})

gulp.task('images:build', async function () {
	const { default: imagemin } = await import('gulp-imagemin')

	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./build/img/'))
		.pipe(webp())
		.pipe(gulp.dest('./build/img/'))
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./build/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./build/img/'))
})

gulp.task('ttfToWoff:build', function () {
	return gulp
		.src('src/fonts/*.ttf')
		.pipe(
			require('through2').obj(function (file, enc, cb) {
				try {
					const result = ttf2woff(file.contents)

					file.contents = Buffer.from(result)
					file.extname = '.woff'

					cb(null, file)
				} catch (error) {
					cb(error)
				}
			}),
		)
		.pipe(gulp.dest('./build/fonts'))
})

gulp.task('ttfToWoff2:build', function () {
	return gulp
		.src('src/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(gulp.dest('./build/fonts'))
})

gulp.task('files:build', function () {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'))
})

gulp.task('js:build', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'))
})

gulp.task('browser-sync:build', function () {
	browserSync.init({
		server: {
			baseDir: './build/',
		},
	})
})
