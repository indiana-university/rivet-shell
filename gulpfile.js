const { src, dest, parallel, series, watch } = require("gulp");
const gutil = require("gulp-util");
const cp = require("child_process");
const sass = require("gulp-sass");
const stylelint = require("gulp-stylelint");
const del = require("del");
const browserSync = require("browser-sync").create();
const header = require("gulp-header");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("autoprefixer");
const pkg = require("./package.json");

const pkgAndVersion = `${pkg.name} - @version ${pkg.version}`;

const CSSBanner = `/*!
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause

 * ${pkgAndVersion}
 */

`;

const sassBanner = `// ${pkgAndVersion}

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
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(dest("docs/css/"));
}

function lintSassWatch() {
  return src("src/sass/**/*.scss")
  .pipe(stylelint({
    failAfterError: false,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
}

function lintSassBuild() {
  return src("src/sass/**/*.scss")
  .pipe(stylelint({
    failAfterError: true,
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
}

function copySass() {
  return src('./src/sass/**/*.scss')
    .pipe(dest('./dist/sass/'));
}

// Development server
function watchFiles(callback) {
  browserSync.init(["docs/css/**/*.css", "docs/js/**/*.js", "docs/**/*.html"], {
    server: {
      baseDir: "./docs"
    }
  });
  watch("src/sass/**/*.scss", { ignoreInitial: false }, series(lintSassWatch, compileSass));
  watch(["src/**/*.md", "src/**/*.njk"], eleventy);

  callback();
}

function cleanCSS() {
  return del(["dist/css/**/*"]);
}

function copyCSS() {
  return src("./docs/css/**/*.css").pipe(dest("./dist/css/"));
}

function minifyCSS() {
  return src("dist/css/" + pkg.name + ".css")
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("dist/css/"));
}

function prefixCSS(callback) {
  src("dist/css/" + pkg.name + ".css")
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      ])
    )
    .pipe(dest("dist/css/"));
  callback();
}

function headerCSS(done) {
  src("dist/css/" + pkg.name + ".css")
    .pipe(header(CSSBanner, { pkg: pkg }))
    .pipe(dest("dist/css/"));

  src("dist/css/" + pkg.name + ".min.css")
    .pipe(header(CSSBanner, { pkg: pkg }))
    .pipe(dest("dist/css/"));

  done();
}

function headerSass(done) {
  src('./dist/sass/**/*.scss')
    .pipe(header(sassBanner, { pkg: pkg }))
    .pipe(dest('./dist/sass/'));
  
  done();
}

// Compiles, prefixes, minifies, and versions CSS
exports.release = series(
  eleventy,
  cleanCSS,
  lintSassBuild,
  compileSass,
  copyCSS,
  prefixCSS,
  minifyCSS,
  copySass,
  headerCSS,
  headerSass
);

exports.buildDocs = series(eleventy, lintSassBuild, compileSass);

exports.default = parallel(eleventyWatch, watchFiles);
