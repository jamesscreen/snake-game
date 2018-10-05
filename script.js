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
	//addEventListener('keydown', changeDirection);
}

function refreshGame(){
	location.reload();
}

function startGame(){
	gameIsRunning = true;
	
	//createSnake(); // функция создания "Змейки"
	
	//каждые 200мс запускаем функцию move
	snake_timer = setInterval(move, SNAKE_SPEED);
	setTimeout(createFood, 5000);
}

function move(){
	m++;
	console.log('Move ' + m + '\n');
}

function createFood(){
	k++;
	console.log('New Food ' + k + '\n');
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

// выполняем инициализацию после загрузки страницы
window.onload = init;