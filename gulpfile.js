const { src, dest, parallel, series, watch } = require("gulp");
const gutil = require("gulp-util");
const cp = require("child_process");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const header = require("gulp-header");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("autoprefixer");
const pkg = require("./package.json");

/**
 * node-sass has an "includePaths" option that we can use to pass
 * an array of file paths where we want it to look for sass files
 * to import. Makes it much easier to include the sass files from
 * the Rivet npm package.
 */
const sassPaths = ["./node_modules/rivet-uits/sass/"];

const banner = `/*!
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause

 * ${pkg.name} - @version ${pkg.version}
 */

`;

/**
 * Using Eleventy static site generator to compile Markdown docs
 * into HTML for testing/demo purposes. Uses the Nunjuck templates
 * inside './src/_includes` for layout.
 *
 * More about Eleventy here:
 * https://www.11ty.io/docs/
 *
 * More about Nunjucks here:
 * https://mozilla.github.io/nunjucks/
 */

function eleventy(callback) {
  cp.exec("npx eleventy", function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
}

function eleventyWatch() {
  const eleventy = cp.spawn("npx", ["eleventy", "--watch"]);

  const eleventyLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log("Eleventy: " + message));
  };

  eleventy.stdout.on("data", eleventyLogger);
  eleventy.stderr.on("data", eleventyLogger);
}

function compileSass() {
  return src("src/sass/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: sassPaths
      }).on("error", sass.logError)
    )
    .pipe(dest("docs/css/"));
}

function sassWatch() {
  watch("src/sass/**/*.scss", { ignoreInitial: false }, compileSass);
}

// Development server
function watchFiles(callback) {
  browserSync.init(["docs/css/**/*.css", "docs/js/**/*.js", "docs/**/*.html"], {
    server: {
      baseDir: "./docs"
    }
  });
  watch("src/sass/**/*.scss", compileSass);
  watch(["src/**/*.md", "src/**/*.njk"], eleventy);

  callback();
}
function copyCSS() {
  return src("./docs/css/**/*.css").pipe(dest("./dist/css/"));
}

function minifyCSS(callback) {
  src("dist/css/" + pkg.name + ".css")
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("dist/css/"));
  callback();
}

function prefixCSS() {
  return src("dist/css/" + pkg.name + ".css")
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      ])
    )
    .pipe(dest("dist/css/"));
}

function headerCSS(done) {
  src("dist/css/" + pkg.name + ".css")
    .pipe(header(banner, { pkg: pkg }))
    .pipe(dest("dist/css/"));

  src("dist/css/" + pkg.name + ".min.css")
    .pipe(header(banner, { pkg: pkg }))
    .pipe(dest("dist/css/"));

  done();
}

// Compiles, prefixes, minifies, and versions CSS
exports.release = series(
  eleventy,
  compileSass,
  copyCSS,
  prefixCSS,
  minifyCSS,
  headerCSS
);

exports.buildDocs = series(eleventy, compileSass);

exports.default = parallel(eleventyWatch, watchFiles);
