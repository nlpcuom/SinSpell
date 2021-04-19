const popperJs = require('@popperjs/core')

window.updateText = function (target,text){
    window.spellchecktmp.word_array[target] = text
    window.render(window.spellchecktmp.target,window.spellchecktmp.word_array)
    document.getElementById('popup').innerHTML = ""
}

window.popupShow = function (target,text){
    const word_list = window.spellchecker.suggest(text,10)
    let output_list = "<ul class='suggetion'>"
    for (const word of word_list) {
        output_list += `<li onClick="window.updateText(${target},'${word}')"><span style="background-color: #FFFF00">${word}</span></li>`
    }
    output_list + "</ul>"

    const targetObj = document.getElementById('w_'+target)
    const tooltip = document.getElementById('popup')
    tooltip.innerHTML = output_list
    popperJs.createPopper(targetObj,tooltip,{
        placement: 'bottom',
    })
}

window.render = function (target,word_array){
    let output = ""
    for (const index in word_array) {
        var word = word_array[index]
        if(word.includes(".")){
            word = word.replace(".", "");
            if (incorrectlist1.includes(word)){
                position = incorrectlist1.indexOf(word);
                output += `<span class="autocorrect">${correctlist1[position]}</span> `
                output += '.'
            }else if (!window.spellchecker.check(word)){
                output += `<span class="invalid" id="w_${index}" onClick="window.popupShow(${index},'${word}')">${word}</span> `
                output += '.'
            }else{
                output += word+'.'+' '
            }
        }else{
            if (incorrectlist1.includes(word)){
                position = incorrectlist1.indexOf(word);
                output += `<span class="autocorrect">${correctlist1[position]}</span> `
            }else if (!window.spellchecker.check(word)){
                output += `<span class="invalid" id="w_${index}" onClick="window.popupShow(${index},'${word}')">${word}</span> `
            }else{
                output += word+' '
            }
        }  
    }
    window.spellchecktmp = {target,word_array}
    document.getElementById(target).innerHTML = output
}

module.exports = window.render