
let gameBoard = $('#gameBoard');
gameBoard.addClass('rounded-4')

let count = 0;
for(let i=1; i < 6; i++){
  let row = $('<div>')  
  row.addClass('row');
  row.attr('id', `row${i}`)
  for(let j=1; j < 6; j++){
    let question = $('<div>')
    question.addClass('col')
    question.attr('id', `square${count++}`)
    row.append(question)
  }
  gameBoard.append(row)
}

$('#row1 .col').text('$100')
$('#row2 .col').text('$200')
$('#row3 .col').text('$400')
$('#row4 .col').text('$600')
$('#row5 .col').text('$800')

let header = $('<h1>');
header.addClass('header')
header.text('Jeopardy');
$('.container').prepend(header)

let actualQuestion;
let pointsEarned;
let totalScore = 0;
let pointsYouHave = 0;

function setItems(){
  if('total' in localStorage){
    $('#score').text(localStorage.getItem('total'))
  }else{
    $('#score').text(0)
    }

  for(let i=0; i<=24; i++){
    if(`square${i}` in localStorage){
      $(`#square${i}`).addClass('active')
    }else{
      $(`#square${i}`).removeClass('active')
    }
  }
}

setItems()

$('.col').on('click', (event)=>{
  $(event.target).addClass('active');
  localStorage.setItem(event.target.id, true)
  fetch('jeopardy.json')
    .then(data=>data.json())
    .then(resp=>{
      let answer$ = $(event.target).text()
      let answerArr = resp.filter((item)=>{
        if(item['value'] === answer$){
          return item
        }
      })
      let questionsLength = answerArr.length;
      let questionPick = Math.floor(Math.random() * questionsLength) + 1;
      actualQuestion = answerArr[questionPick]
      console.log(actualQuestion);
      $('#question').text('')
      $('#question').append(actualQuestion.question)
      });
    })

$('#clear-score').on('click', ()=>{
  localStorage.clear()
  setItems()
  pointsYouHave = 0;
  actualQuestion = '';
})

$('#submit-answer').on('click', (e)=>{
    let answerToQuestion = $('#answer').val();
    let correctAns = actualQuestion.answer.toLowerCase();
    console.log(correctAns);
    if(correctAns.includes(answerToQuestion.toLowerCase()) && answerToQuestion !== ''){
        pointsYouHave = $('#score').text()
        pointsEarned = actualQuestion.value;
        pointsEarned = pointsEarned.slice(1);
        totalScore = parseInt(pointsYouHave) + parseInt(pointsEarned);
        $('#answer').val('');
        $('#question').text('That is correct! Please pick a new square.')
    }else{
      $('#question').text(`The correct answer is: ${actualQuestion.answer}.
       Please pick a new square.`)
    }
    
    localStorage.setItem('total', totalScore)
    $('#score').text(localStorage.getItem('total'));
    actualQuestion = '';
  })




  

    





