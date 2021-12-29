const express = require('express');
const app = express();
app.listen(3000, () => { console.log('listening on port 3000') });

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.use(express.static('public'));
app.post('/', (req, res) => {
    var cli = process.argv.slice(2)
    var path = require('path')
    var fs = require('fs')
    var cheerio = require('cheerio')
    const Folder = './file/';

    fs.readdirSync(Folder).forEach(file => {
        console.log(file);
    });
    console.log(fs.readdirSync(Folder)[0]);
    console.log(path.resolve(__dirname, 'file/bm.html'));
    // var $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, cli[0])))

    var $ = cheerio.load(fs.readFileSync(path.resolve(__dirname, `file/${fs.readdirSync(Folder)[0]}`)))


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