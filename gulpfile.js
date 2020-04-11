"use strict";

/*global require*/
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

/**
 * List of options
 * Список опций
 */
const options = {
	uglifyJS: true,
	useBabel: true,
};

/*
 * List of directories
 * Список директорий
 */
const paths = {
	input: {
		sass: './src/css/',
		js: './src/js/',
		images: './src/img/',
	},
	output: {
		css: './assets/css/',
		js: './assets/js/',
		images: './assets/img/'
	},
	assets: './assets/',
};

/************************
 * Gulp Tasks / Задачи  *
 ************************/

/**
 *  Concat all scripts and make sourcemap (optional)
 *  Scripts from vendor folder added first
 *  Объединяем все скрипты в один файл и делаем карту (опционально)
 *  Скрипты из папки vendor добавляются в первую очередь
 */
gulp.task('javascript', function () {
	return gulp.src([paths.input.js + '*.js'])
	.pipe(plumber())
	.pipe(gulp.dest(paths.output.js))
});

/*
* Minify all images
* Оптимизируем изображения
*/
gulp.task('image-min', function () {
	return gulp.src(paths.input.images + '**/*.+(png|jpg|gif|svg|jpeg)')
	.pipe(plumber())
	.pipe(changed(paths.output.images))
	.pipe(imagemin())
	.pipe(gulp.dest(paths.output.images));
});


/**
 * Removing assets folder with it contents
 * Удаляем папку assets со всем ее содержимым
 */
gulp.task('build-clean', function () {
	return del(paths.assets);
});

/**
 * Building distributive
 * Создаем дистрибутив
 */
gulp.task('build-dist', function () {
	runSequence('build-clean',
		['sass', 'javascript', 'image-min']);
});

/**
 * Compile .scss files
 * Autoprefixer
 * Sourcemaps (optional)
 * Компилируем файлы .scss
 * Используем Autoprefixer для добавления вендорных префиксов
 * Создаем карты (опционально)
 */
gulp.task('sass', function () {
	return gulp.src(paths.input.sass + '*.css')
	.pipe(plumber())
	.pipe(postcss([autoprefixer()]))
	.pipe(gulp.dest(paths.output.css))
});

/**
 * Shorthand for build-dist
 */
gulp.task('build', ['build-dist']);
