const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const formidable = require('formidable');
const app = express();
const bodyParser = require('body-parser');
const textParser = bodyParser.text();
app.listen(process.env.PORT, () => { console.log('listening') });

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.use(express.static('public'));
app.use(express.json())

app.post('/', (req, res) => {
    // bookmark parser by devster31 -------------------------------------------
    var cli = process.argv.slice(2)
    var path = require('path')
    var fs = require('fs')
    var cheerio = require('cheerio')
    const Folder = './file/';

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
    // ----------------------------------------------------------------
    fs.unlink(`file/${fs.readdirSync(Folder)[1]}`, (err) => {
        if (err) {
            throw err;
        }
        console.log("file deleted");
    })
    res.send(JSON.stringify(jsonbmArray, null, 4))
})

app.post('/upload', textParser, function(req, res) {
    const form = new formidable.IncomingForm();
    form.on('fileBegin', function(formname, file){
        file.filepath = __dirname + '/file/' + file.originalFilename;
    })
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({status: 'ok'})
    })
})