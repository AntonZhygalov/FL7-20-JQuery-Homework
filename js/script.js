var game = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var gameWin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var steps = 0;
var minutes = 0;
var seconds = 0;
var arrayWin = [];
var newTimer;

function createGame(arr){
    for (var i = 0; i < arr.length; i++) {
        $('.game').append(`<div class="block_${arr[i]}">${arr[i]}</div>`);
    }
}
createGame(game);


function swapPlaces(event) {
    if (event.target.className === 'game') {
    } else {
        var target = event.target;
    }
    if ($(target).index() + 1 === $('.block_16').index()) {
        steps++;
        $(target).animate({
            "left": "+=85px"
        }, 200, function() {
            $('.block_16').removeClass('block_16').addClass(target.className).html(target.innerHTML);
            $(target).removeAttr('style').removeClass(target.className).addClass('block_16').html('16');
            win();
        });
    } else if ($(target).index() - 1 === $('.block_16').index()) {
        steps++;
        $(target).animate({
            "left": "-=85px"
        }, 200, function() {
            $('.block_16').removeClass('block_16').addClass(target.className).html(target.innerHTML);
            $(target).removeAttr('style').removeClass(target.className).addClass('block_16').html('16');
            win();
        });
    } else if ($(target).index() - 4 === $('.block_16').index()) {
        steps++;
        $(target).animate({
            "top": "-=85px"
        }, 200, function() {
            $('.block_16').removeClass('block_16').addClass(target.className).html(target.innerHTML);
            $(target).removeAttr('style').removeClass(target.className).addClass('block_16').html('16');
            win();
        });
    } else if ($(target).index() + 4 === $('.block_16').index()) {
        steps++;
        $(target).animate({
            "top": "+=85px"
        }, 200, function() {
            $('.block_16').removeClass('block_16').addClass(target.className).html(target.innerHTML);
            $(target).removeAttr('style').removeClass(target.className).addClass('block_16').html('16');
            win();
        });
    }
    $('.steps').html(steps);
}


function timer() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    if (seconds < 10 & minutes < 10) {
        $('.time').html(`0${minutes}:0${seconds}`);
    } else if (seconds >= 10 & minutes < 10) {
        $('.time').html(`0${minutes}:${seconds}`);
    } else if (seconds < 10 & minutes >= 10) {
        $('.time').html(`${minutes}:0${seconds}`);
    } else $('.time').html(`${minutes}:${seconds}`);

    
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 != currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function win(){
    arrayWin = [];
    for (var i = 0; i < game.length; i++) {
        arrayWin.push($('.game').children()[i].innerHTML);
    }
    if(arrayWin.toString()===gameWin.toString()){
        clearInterval(newTimer);
        $('.game').off('click', swapPlaces);
        setTimeout(() => alert('Congratulation You Win!!!'),100);
    }
};

$('.newGame').on('click', function(){
        $('.game').off('click', swapPlaces);
        $('.game').empty();
        seconds = 0;
        minutes = 0;
        steps = 0;
        $('.steps').html(steps);
        $('.time').html(`0${minutes}:0${seconds}`);
        shuffle(game);
        createGame(game);
        $('.game').on('click', swapPlaces);
        clearInterval(newTimer);
        newTimer = setInterval(timer, 1000);
})

$('.pressWin').on('click', function(){
        $('.game').off('click', swapPlaces);
        $('.game').empty();
        createGame(gameWin);
        win();
})