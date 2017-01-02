var uncss = require('uncss')
var glob = require('glob')
var fs = require('fs')

var stylesheetLocation = '/var/www/html/assets/css/'
var stylesheetSourceLocation = '_includes/'
var stylesheetName = 'styles.css'

var jekyllUncss = function() {
  var css = fs.readFileSync(stylesheetLocation + stylesheetName, 'utf8')

  glob('_site/**/*.html', function(err, files) {
    if (err) {
      console.log(err)
    }

    uncss(files, {
      raw: css,
      ignoreSheets:[/\/css\//]
    }, function(err, output) {
      if (err) {
        console.log(err)
      }
      var cleanoutput = output.replace(/!important/g, '');
      fs.writeFileSync(stylesheetSourceLocation + 'un.' + stylesheetName, 
          cleanoutput);
      console.log("Please run: java -jar yuicompressor-2.4.8.jar _includes/un.styles.css  -o  _includes/un.min.styles.css");
    })
  })
}

jekyllUncss()
