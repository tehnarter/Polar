# gulp-webp-css

## Example
```css
// Input
.banner{
    background: url(/img/bannerbg.jpg) no-repeat center;
}

// Output
.banner{
    background: url(/img/bannerbg.jpg) no-repeat center;
}
@supports (-webkit-appearance:none){
    .banner {
        background-image: url(/img/bannerbg.webp);
    }
}
```
## Install
```bash
npm i --save-dev gulp-webp-css
```
## Usage
```javascript
var webpCss = require('gulp-webp-css');

gulp.task('css', function () {
    gulp.src('./assets/css/*.css')
        .pipe(webpCss()) // or .pipe(webpCss(['.jpg','.jpeg']))
        .pipe(gulp.dest('./public/css/'))
});
```
