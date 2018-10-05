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

function init(){
	createGameField(); // создаем игровое поле
	
}

function createGameField(){
	var game_table = document.createElement('table');
	game_table.setAttribute('class', 'game-table');
	
	
	
	// Добавление таблицы
	document.getElementById('game-field').appendChild(game_table);
}

// выполняем инициализацию после загрузки страницы
window.onload = init;