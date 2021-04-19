var Spellchecker = require("hunspell-spellchecker");
var fs = require('fs')
var spellchecker = new Spellchecker();

var DICT = spellchecker.parse({
    aff: fs.readFileSync("./si_LK.aff"),
    dic: fs.readFileSync("./si_LK.dic")
});

fs.readFile("./autocorrectionWords.txt", 'utf8', function(err, data) {
    if (err) throw err;
    var autolist = data.split('\n');
    var incorrectlist = [];
    var correctlist = [];
    for (const index in autolist) {
        const oneset = autolist[index]
        var incorrect = oneset.split(':')[0];
        var correct = oneset.split(':')[1];
        incorrectlist.push(incorrect);
        correctlist.push(correct);
    }
    window.incorrectlist1 = incorrectlist;
    window.correctlist1 = correctlist;
});

window.spellchecker = spellchecker;

window.checkSpell = function () {
    var texttocheck = document.getElementById("TextToCheck").value;
    const UIHandler = require('./UIHandler')
    UIHandler("output",texttocheck.split(' '))
}