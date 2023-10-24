let containerHTML = `<div class="container text-center" id="grid"></div>`

$('body').append(containerHTML)

for(let i=1; i < 6; i++){
    $('#grid').append(`<div class="row" id="row${i}"></div>`)
}

for(let i=1; i < 6; i++){
    for(let j=0; j <6; i++){
    $(`#row${i}`).append(`<div class="col-3" id="col${j}">Col ${j}</div>`)
    }
}