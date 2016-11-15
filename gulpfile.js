/**
 * Tasks:
 *   clean - deletes `build` and `dist` directories.
 *   serve - launch http server, watch for changes and compile in Development Mode when something is changed.
 *   dist - build application for production.
 *   default - alias for a dist task.
 */

const exec = require("child_process").exec;
const gulp = require("gulp");
const del = require("del");
const gulpIf = require("gulp-if");
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpRename = require("gulp-rename");
const rollup = require("rollup");
const rollupSourceMaps = require("rollup-plugin-sourcemaps");
const rollupAlias = require("rollup-plugin-alias");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupReplace = require("rollup-plugin-replace");
const closureCompiler = require("google-closure-compiler").gulp();
const browserSync = require("browser-sync").create();

const series = gulp.series;
const parallel = gulp.parallel;

/**
 * Enable Sourcemaps for optimized builds.
 */
const ENABLE_SOURCEMAPS = true;

/**
 * See [Closure Compiler Handbook](https://github.com/roman01la/closure-compiler-handbook) for details.
 */
const CLOSURE_OPTS = {
    compilation_level: "ADVANCED",
    language_in: "ECMASCRIPT6_STRICT",
    language_out: "ECMASCRIPT5_STRICT",
    use_types_for_optimization: true,
    assume_function_wrapper: true,
    // TODO: replace with --isolation-mode=IIFE in the next release
    // https://github.com/google/closure-compiler/commit/51dd82730ec76874a8de15a4b6b6d856d901fdb2
    output_wrapper: "(function(){%output%}).call(this);",
    summary_detail_level: 3,
    warning_level: "QUIET",
    rewrite_polyfills: true,
};

/**
 * Reload browserSync, simple reload without this wrapper doesn't work in gulp4.
 */
function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(["build", "dist"]);
}

function copyAssets() {
    return gulp.src(["src/**/*.html", "src/**/*.css"])
        .pipe(gulp.dest("dist"));
}

function compileTypescript(done) {
    exec("./node_modules/typescript/bin/tsc --importHelpers",
        function (err, stdout, stderr) {
            if (stdout) {
                console.log(stdout);
            }
            if (stderr) {
                console.log(stderr);
            }
            done(err);
        });
}

function bundle(devMode) {
    return function bundle() {
        return rollup.rollup({
            entry: "build/es6/src/main.js",
            context: "window",
            plugins: [
                rollupSourceMaps(),
                rollupAlias({
                    tslib: "node_modules/tslib/tslib.es6.js",
                }),
                rollupNodeResolve({ jsnext: true }),
                rollupReplace({
                    values: {
                        "__IVI_DEV__": !!devMode,
                    },
                }),
            ],
        }).then((bundle) => Promise.all([
            bundle.write({
                format: "es",
                dest: "build/bundle.js",
                sourceMap: true,
            }),
        ]));
    };
}

function copyBundleToDist() {
    return gulp.src("build/bundle.js")
        .pipe(gulp.dest("dist"));
}

function optimizeJavascriptBundle() {
    return gulp.src("build/bundle.js")
        .pipe(gulpIf(ENABLE_SOURCEMAPS, gulpSourcemaps.init({ loadMaps: true })))
        .pipe(closureCompiler(Object.assign({}, CLOSURE_OPTS, {
            js_output_file: "bundle.js",
        })))
        .pipe(gulpIf(ENABLE_SOURCEMAPS, gulpSourcemaps.write(".", { destPath: "dist" })))
        .pipe(gulp.dest("dist"));
}

function watch() {
    gulp.watch(["src/**/*.html", "src/**/*.css"],
        series(
            copyAssets,
            browserSyncReload
        ));

    gulp.watch("src/**/*.ts", series(
        compileTypescript,
        bundle(true),
        copyBundleToDist,
        browserSyncReload
    ));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true,
        },
        minify: false,
    });

    watch();
}

exports.clean = clean;
exports.compileTypescript = compileTypescript;
exports.watch = series(copyAssets, compileTypescript, bundle(true), copyBundleToDist, watch);
exports.serve = series(copyAssets, compileTypescript, bundle(true), copyBundleToDist, serve);
exports.default = exports.dist = series(
    clean,
    copyAssets,
    compileTypescript,
    bundle(false),
    optimizeJavascriptBundle
);
