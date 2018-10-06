//задаем параметры игры
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат

var m = 0;
var k = 0;


function init(){
	createGameField(); // создаем игровое поле
	
	// при нажатии на кнопку "Старт" запускаем функцию "startGame"
	document.getElementById('start-btn').addEventListener('click', startGame);
	// при нажатии на кнопку "Новая игра" запускаем функцию "refreshGame"
	document.getElementById('reset-btn').addEventListener('click', refreshGame);
	
	// отслеживание клавиш клавиатуры
	addEventListener('keydown', changeDirection);
}

function refreshGame(){
	location.reload();
}


function startGame(){
	gameIsRunning = true;
	
	createSnake(); // функция создания "Змейки"
	
	//каждые 200мс запускаем функцию move
	snake_timer = setInterval(move, SNAKE_SPEED);
	setTimeout(createFood, 5000);
}


// располагаем змейку на игровом поле
function createSnake(){
	// стартовая длина змейки = 2
	// Змейка - массив td
	
	// задаем координаты появления Змейки
	var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
	var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
	
	// голова Змейки
	var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
	snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
	// тело Змейки
	var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
	snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
	
	snake.push(snake_head);
	console.log(snake_head);
	snake.push(snake_tail);
	console.log(snake_tail);
}


// движение Змейки
function move(){
	// Сборка классов
	var snake_head_classes = snake[snake.length-1].getAttribute('class').split(' ');
	//console.log(snake_head_classes);
	
	// Сдвиг головы
	var new_unit;
	var snake_coord = snake_head_classes[1].split('-'); // получаем координаты x и y
	//console.log(snake_coord);
	var coord_x = parseInt(snake_coord[2]);
	var coord_y = parseInt(snake_coord[1]);
	
	// Определяем, где появится новая точка (в зависимости от движения змейки)
	if(direction == 'x-'){
		new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
	} else if(direction == 'x+'){
		new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
	} else if(direction == 'y+'){
		new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
	} else if(direction == 'y-'){
		new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
	}
	
	
	// Проверки
	// 1) new_unit не часть змейки
	// 2) Змейка не ушла за границу поля
	//console.log(new_unit);
	
	if (!isSnakeUnit(new_unit) && new_unit !== undefined){
		
		// Добавление новой части змейки
		new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
		snake.push(new_unit);
		
		// Проверяем, надо ли убрать хвост
		if (!haveFood(new_unit)) {
			
			// Находим хвост
			var removed = snake.splice(0, 1)[0];
			console.log(removed);
			var classes = removed.getAttribute('class').split(' ');
			//console.log(classes);
			
			// удаляем хвост
			removed.setAttribute('class', classes[0] + ' ' + classes[1]);
		}
	} else {
		finishTheGame();
	}
}


function isSnakeUnit(unit) {
	var check = false;
	if (snake.includes(unit)) {
		check = true;
	}
	return check;
}


function haveFood(unit){
	var check = false;
	var unit_classes = unit.getAttribute('class').split(' ');
	
	// Если еда
	if(unit_classes.includes('food-unit')){
		check = true;
		createFood();
		
		score++;
		
		printScore(); // выводи счет в реальном времени
	}
	return check;
}


function printScore(){
	document.getElementById('score-field').textContent = 'Текущий счёт: ' + score;
}


function createFood(unit){
	var foodCreated = false;
	
	while (!foodCreated) { //пока еду не создали
		// рандом
		var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
		var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

		var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
		var food_cell_classes = food_cell.getAttribute('class').split(' ');

		// проверка на змейку
		if (!food_cell_classes.includes('snake-unit')) {
			var classes = '';
			for (var i = 0; i < food_cell_classes.length; i++) {
				classes += food_cell_classes[i] + ' ';
			}

			food_cell.setAttribute('class', classes + 'food-unit');
			foodCreated = true;
		}
	}
}


/*
	Изменение направления движения змейки
	e - событие
*/
function changeDirection(e) {
	console.log(e);
	switch (e.keyCode) {
		case 37: // Клавиша влево
			if (direction != 'x+') {
				direction = 'x-'
			}
			break;
		case 38: // Клавиша вверх
			if (direction != 'y-') {
				direction = 'y+'
				}
			break;
		case 39: // Клавиша вправо
			if (direction != 'x-') {
				direction = 'x+'
			}
			break;
		case 40: // Клавиша вниз
			if (direction != 'y+') {
				direction = 'y-'
			}
			break;
	}
}


function createGameField(){
	// создаем новый тег "table"
	var game_table = document.createElement('table');
	// добавляем тегу "table" класс "game-table"
	game_table.setAttribute('class', 'game-table');
	
	//пишем алгоритм генерации ячеек таблицы
	for(var i = 0; i < FIELD_SIZE_X; i++){
		var row = document.createElement('tr');
		row.className = 'game-table-row row-' + i;
		//row.setAttribute('class', 'game-table-row row-' + i);
		
		for(var j = 0; j < FIELD_SIZE_Y; j++){
			var cell = document.createElement('td');
			cell.className = 'game-table-cell cell-' + i + '-' + j;
			//cell.setAttribute('class', 'game-table-cell cell-' + i + '-' + j);
			row.appendChild(cell); // добавление ячейки в строку
		}
		game_table.appendChild(row); // добавляем строку
	}
	// Добавление таблицы
	document.getElementById('game-field').appendChild(game_table);
}


function finishTheGame(){
	gameIsRunning = false;
	clearInterval(snake_timer);
	alert('Вы проиграли! Ваш результат: ' + score.toString());
}


// выполняем инициализацию после загрузки страницы
window.onload = init;