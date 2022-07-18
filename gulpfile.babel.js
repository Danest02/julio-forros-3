import gulp, { watch } from "gulp";

const squoosh = require("gulp-libsquoosh");

// import htmlmin from 'gulp-htmlmin';

import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";

import pug from "gulp-pug";
var sass = require("gulp-sass")(require("sass"));

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

import clean from "gulp-purgecss";

import rename from "gulp-rename";


// TODO--- MINIFICAR EL HTML

// gulp.task('html-min', () => {
//     return gulp
//         .src('./public/*html')
//         .pipe(
//             htmlmin({
//                 collapseWhitespace: true,
//                 removeComments: true
//             })
//         )
//         .pipe(gulp.dest('./public'));
// });

// TODO--- COMPILAR JS CON BABEL

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts-min.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("./public"));
});


// TODO--- PREPROCESAR HTML CON PUG

const pages = true;
gulp.task("pugPages", () => {
  return (
    gulp
      .src("./src/pug/*.pug")
      .pipe(
        pug({
          pretty: pages ? false : true,
        })
      )
      // .pipe(rename({
      //     extname: ".php"
      //   }))
      .pipe(gulp.dest("./public"))
  );
});


// TODO--- RENOMBRAR HTML CON PUG

// gulp.task('rename', () => {
//     return gulp
//         .src('./src/*.html')
//         .pipe(rename({
//             extname: ".php"
//           }))
//         .pipe(gulp.dest('./public'));
// });


// TODO--- PREPROCESAR CSS CON SASS

// gulp.task('sass', () => {
//     return gulp
//         .src('./src/scss/styles.scss')
//         .pipe(
//             sass({
//                 outputStyle: 'compressed'
//             })
//         )
//         .pipe(gulp.dest('./public/css'))
// });

// TODO--- PROCESAR CSS OMNIBUS CON POST CSS

gulp.task("cssOmnibus", () => {
  var procesadores = [autoprefixer, cssnano];
  return gulp
    .src("./src/scss/scss omnibus/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(procesadores))
    .pipe(
      clean({
        content: ["./public/*.html"],
        css: ["./public/css/styles.css"],
        safelist: [
          "hamburguer--simple",
          "navbar-header__links--hamburger",
          "navbar-header--hide",
          "navbar-header--scroll",
          "display-none",
          "animated-border--active",
          "aparecer",
          "my-slider__navegation-button--opacity-none",
          "transition-none",
        ],
        FontFace: true,
        variables: false,
      })
    )
    .pipe(gulp.dest("./public/"));
});
// TODO--- PROCESAR CSS PAGES CON POST CSS

gulp.task("cssPages", () => {
  var procesadores = [autoprefixer, cssnano];
  return gulp
    .src("./src/scss/scss pages/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(procesadores))
    .pipe(
      clean({
        content: ["./public/*.html"],
        css: ["./public/css/styles.css"],
        safelist: [
        ],
        FontFace: true,
        variables: false,
      })
    )
    .pipe(gulp.dest("./public/"));
});


// TODO--- PURGAR CSS CON PURGE CSS

// gulp.task('clean', () => {
//     return gulp
//       .src('./public/css/styles.css')
//       .pipe(
//         clean({
//           content: ['./public/*.html'],
//           css: ['./public/css/styles.css'],
//           safelist: ['hamburguer--simple', 'navbar-header--scroll', 'navbar-header--hide', 'navbar-header--hamburguer', 'mybtn--ghost', 'swiper-pagination-bullet', 'swiper-pagination-bullet-active'],
//           FontFace: true,
//           variables: true
//         })
//       )
//       .pipe(gulp.dest('./public/css'));
// });

// TODO--- MINIFICAR IMAGENES

gulp.task("imagemindefault", () => {
  return gulp
    .src("src/galery/images/default/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          quant : { 
                habilitado : true , 
                numColors : 128 , 
              } ,
          // resize: {
          //   enabled: true,
          //   width: 720,
          //   // width: Math.round(src.width / 2),
          //   // height: Math.round(src.height / 2),
          // },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images/default"));
});


// TODO--- MINIFICAR IMAGENES 310

gulp.task("imagemin310", () => {
  return gulp
    .src("src/galery/images/310/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          quant : { 
                habilitado : true , 
                numColors : 128 , 
              } ,
          resize: {
            enabled: true,
            width: 310,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/images/"));
});

// TODO--- MINIFICAR IMAGENES 400

gulp.task("imagemin400", () => {
  return gulp
    .src("src/galery/images/400/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          quant : { 
                habilitado : true , 
                numColors : 128 , 
              } ,
          resize: {
            enabled: true,
            width: 400,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images/400/"));
});

// TODO--- MINIFICAR IMAGENES 500

gulp.task("imagemin500", () => {
  return gulp
    .src("src/galery/images/500/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          quant : { 
                habilitado : true , 
                numColors : 128 , 
              } ,
          resize: {
            enabled: true,
            width: 500,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/images/"));
});

gulp.task("default", () => {
  gulp.watch("./src/js/*.js", gulp.series("babel"));
  // gulp.watch('./src/pug/**/*.pug', gulp.series('pugIndex'));
  gulp.watch("./src/pug/*.pug", gulp.series("pugPages"));
  gulp.watch("./src/pug/**/*.pug", gulp.series("pugPages"));
  gulp.watch("./src/scss/scss omnibus/**/*.scss", gulp.series("cssOmnibus"));
  gulp.watch("./src/scss/scss pages/*.scss", gulp.series("cssPages"));
  // gulp.watch("./src/scss/**/*.scss", gulp.series("css"));
  // gulp.watch('./src/galery/images/**/*', gulp.series('imagemin'))
  // gulp.watch('./src/scss/**/*.scss', gulp.series('clean'))
  // gulp.watch('./src/*.html', gulp.series('html-min'))
  // gulp.watch('./src/pug/**/*.pug', gulp.series('rename'));
  // gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
});
