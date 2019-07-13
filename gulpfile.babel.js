import {src, dest, watch} from 'gulp';
import sass from 'gulp-sass';
import yargs from 'yargs';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

const PRODUCTION = yargs.argv.prod;

export const styles = () => {
	return src('sass/style.scss')
		.pipe(gulpif(PRODUCTION, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
		.pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie9'})))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(dest('css'));
}

export const watchForChanges = () => {
	watch('sass/**/*.scss', styles);
}
