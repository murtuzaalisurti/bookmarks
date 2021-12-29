const express = require('express');
const path = require('path');
const formidable = require('formidable');
const app = express();
const bodyParser = require('body-parser');
const textParser = bodyParser.text();
app.listen(3000, () => { console.log('listening on port 3000') });

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.use(express.static('public'));
app.use(express.json())

app.post('/', (req, res) => {
    var cli = process.argv.slice(2)
    var path = require('path')
    var fs = require('fs')
    var cheerio = require('cheerio')
    const Folder = './file/';

    fs.readdirSync(Folder).forEach(file => {
        console.log(file);
    });
    console.log(fs.readdirSync(Folder)[1]);
    console.log(path.resolve(__dirname, 'file/bookmarks_msurti_5_17_21.html'));
    // var $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, cli[0])))

    var $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, `file/${fs.readdirSync(Folder)[1]}`)))


    function getCategories($a) {
        var $node = $a.closest('DL').prev();
        var title = $node.text();
        var add_date = $node.attr("add_date");
        var last_modified = $node.attr("last_modified");
        if ($node.length > 0 && title.length > 0) {
            return [{
                'name': title,
                'last_modified': typeof last_modified === "undefined" ? null : last_modified,
                'add_date': typeof add_date === "undefined" ? null : add_date,
            }].concat(getCategories($node));
        } else {
            return [];
        }
    }

    var jsonbmArray = []
    $('a').each(function (index, a) {
        let $a = $(a)
        let add_date = $a.attr('add_date')
        let last_modified = $a.attr('last_modified')
        let description = $a.next('dd').text().split("\n")[0] // ugly but works
        let categories = getCategories($a)
        // add level information
        let new_categories = categories.reverse().map(function (currentValue, index) {
            return currentValue['level'] = index + 1, currentValue
        })
        try {
            var tags = $a.attr('tags').split(',') || []
        } catch (e) {
            var tags = []
        }
        let jsonbm = {
            'description': description,
            'title': $a.text(),
            'url': $a.attr('href'),
            'categories': categories,
            'tags': tags,
            'last_modified': typeof last_modified === "undefined" ? null : last_modified,
            'add_date': typeof add_date === "undefined" ? null : add_date,
        }
        jsonbmArray.push(jsonbm)
    })
    // console.log(JSON.stringify(jsonbmArray, null, 4));
    // fs.writeFileSync(path.resolve(__dirname, cli[0]), JSON.stringify(jsonbmArray, null, 4))
    res.send(JSON.stringify(jsonbmArray, null, 4))
})

app.post('/upload', textParser, function(req, res) {
    const form = new formidable.IncomingForm();
    form.on('fileBegin', function(formname, file){
        console.log(file.filepath, file.originalFilename);
        console.log(__dirname);
        file.filepath = __dirname + '/file/' + file.originalFilename;
        console.log(file.filepath);
    })
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({ error: err.message });
        }
        // console.log(files, files.file);
    })
    // console.log(req);
})