var chokidar = require('chokidar');
var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var rep = "tmp/";
var mammoth = require("mammoth");
var optionsStyleMap = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ]
};

// One-liner for current directory, ignores .dotfiles
chokidar.watch(rep, {ignored: /(^|[\/\\])\../}).on('add', (event, path) => {
  console.log('add');

  console.log(event, path);

  mammoth.convertToHtml({path: event}, optionsStyleMap)
    .then(function(result){
        console.log(result.value);

        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion

        fs.writeFile('test.html', html, function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        });

    })
    .done();
});
