//поле игрока и поле компа
let compPlayingField = document.getElementById('compPlayingField');
let playerPlayingField = document.getElementById('playerPlayingField');

//радиобаттоны для выбора размера корабля
let fourDeckChoice = document.getElementById('fourDeck');
let threeDeckChoice = document.getElementById('threeDeck');
let twoDeckChoice = document.getElementById('twoDeck');
let oneDeckChoice = document.getElementById('oneDeck');
let choice = 0; //переменная для выбора

//блоки с информацией
let infoAndChoice = document.getElementById('infoAndChoice');
let infoAutoInstall = document.getElementById('infoAutoInstall');
let playerInfoBlock = document.getElementById('playerInfoBlock');
let compInfoBlock = document.getElementById('compInfoBlock');

//блок и радиобаттоны ручной и автоматический установки
let installationChoice = document.getElementById('installationChoice');
let byHand = document.getElementById('byHand');
let auto = document.getElementById('auto');

//блок со старт баттон
let startButtonBlock = document.getElementById('startButtonBlock');

//блок с рестартом
let restartButtonBlock = document.getElementById('restartButtonBlock');

//блок с кнопкой перестановки кораблей
let moveButtonBlock = document.getElementById('moveButtonBlock');

//переменная для хранения раненой клетки
let woundedSellId = -1;

//флот игрока и компа
let playerFleet = [];
let compFleet = [];

//массивы ячкеек заполненых кораблями и окружающими клетками в поле игрока
let playerSells = [];
let playerSellsToInstal = [];

//массивы ячкеек заполненых кораблями и окружающими клетками в поле компа
let compSells = [];
let compSellsToInstal = [];


//убираю открытие контекстного меню по ПКМ
document.oncontextmenu = function (){return false};


//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

//целое рандомное число
function getRandomNumber(min, max) {
	let rand = min + Math.random() * (max - min + 1);
	return Math.floor(rand);
}


//убираю число из массива
function deleteNumberFromArr(a, ...arr) {
	
	for (let i = 0; i < arr.length; i++) {
		if (a == arr[i]) {
			arr.splice(i, 1);
			break;
		}
	}
	return arr;
	
}



//ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ОПРЕДЕЛЕНИЯ КОРАБЛЯ


//добавляю корабль во флот игрока
function pushShipInPlayerFleet(a, i, ...arr) {
	
	//добавляю обект со свойствами размер, головная ячейка, массив ячеек...
	playerFleet.push({
		deck: a,
		headSell: i,
		sells: arr,
		lifeSells: arr.slice(),
	});
	
}


//добавляю корабль во флот компа
function pushShipInCompFleet(a, i, ...arr) {
	
	//добавляю обект со свойствами размер, головная ячейка, массив ячеек...
	compFleet.push({
		deck: a,
		headSell: i,
		sells: arr,
		lifeSells: arr.slice(),
	});
	
}


//получаю по головной ячейки массив ячеек корабля игрока
function getSellsByHead(i) {
	
	for (let j = 0; j < playerFleet.length; j++) {
		
		//для каждого элемента из массива флота
		//проверяю значиние свойства головная ячейка на раыенство i
		// при совпадении возвращаю массив ячеек корабля
		if (playerFleet[j].headSell == i) {
			return playerFleet[j].sells;
			break;
		}
		
	}
	
}


//получаю по головной ячейки массив ячеек корабля компа
function getSellsByHeadCompFleet(i) {
	
	for (let j = 0; j < compFleet.length; j++) {
		
		//для каждого элемента из массива флота
		//проверяю значиние свойства головная ячейка на раыенство i
		// при совпадении возвращаю массив ячеек корабля
		if (compFleet[j].headSell == i) {
			return compFleet[j].sells;
			break;
		}
		
	}
	
}


//удаляем корабль из флота игрока по голове
function spliceShipOutPlayerFleet(i) {
	
	for (let j = 0; j < playerFleet.length; j++) {
		
		//для каждого элемента из массива флота
		//проверяю значиние свойства головная ячейка на раыенство i
		//при совпдении удаляю этот элемент из массива флота
		if (playerFleet[j].headSell == i) {
			playerFleet.splice(j, 1);
			break;
		}
		
	}
	
}


//удаляем корабль из флота компа по голове
function spliceShipOutCompFleet(i) {
	
	for (let j = 0; j < compFleet.length; j++) {
		
		//для каждого элемента из массива флота
		//проверяю значиние свойства головная ячейка на раыенство i
		//при совпдении удаляю этот элемент из массива флота
		if (compFleet[j].headSell == i) {
			compFleet.splice(j, 1);
			break;
		}
		
	}
	
}


//проверяю сколько кораблей такого размера уже поставлено
function checkDeck(a) {
	
	//счетчик совпадений
	let count = 0;
	
	for (let j = 0; j < playerFleet.length; j++) {
		
		//для каждого элемента из массива флота
		//проверяю значиние размера корабля на равенство нужному размеру
		//присовпадении накидываю счетчик
		if (playerFleet[j].deck == a) {
			count++;
		}
		
	}
	
	//возвращаю тру при разном значении счётчика
	//для соответствующего размера корабля
	if (a == 4 && count < 1){
		return true;
	} else if (a == 3 && count < 2) {
		return true;
	} else if (a == 2 && count < 3) {
		return true;
	} else if (a == 1 && count < 4) {
		return true;
	} else {
		return false;
	}
	
}


//проверяю что ячейка является головной ячейкой корабля
function checkHeadSell(i) {
	
	//маркер
	let check = 0;
	
	//для каждого элемента из массива флота
	//проверяю значиние свойства головная ячейка на раыенство i
	//при соответствии меняю маркер
	for (let j = 0; j < playerFleet.length; j++) {
		
		if (playerFleet[j].headSell == i) {
			check = 1;
		}
		
	}
	
	if (check) {
		return true;
	} else {
		return false;
	}
	
}



//функция для создания игровых полей игрока и компа
function createField(a) {
	
	let sell;
	
	if (a) {
		
		for (let i = 0; i <= 99; i++) {
			sell = document.createElement('div');
			sell.classList = "sell";
			sell.id = i;
			
			playerPlayingField.append(sell);
			playerSells.push(i);
			playerSellsToInstal.push(i);
			
		}
	} else {
		
		for (let i = 0; i <= 99; i++) {
			sell = document.createElement('div');
			sell.classList = "sell";
			sell.id = i + "_comp";
			
			compPlayingField.append(sell);
			compSells.push(i);
			compSellsToInstal.push(i);
			
		}
		
	}
	
}


//создаю инровые поля 
createField(1);
createField(0);


//выбираю способ установки кораблей
function choiceInstallationMethod() {
	
	installationChoice.style.display = "none";
	
	if (byHand.checked) {
		infoAndChoice.style.display = "block";
	} else if (auto.checked) {
		infoAutoInstall.style.display = "block";
		autoInstalPlayerShips();
	}
	
	restartButtonBlock.style.display = "block";
	
}


//рестарт
function restartGame () {
	
	//переменная для ответа на вопрос о рестарте
	let restartQuestion = confirm("Точно хотите начать заново?");
	
	//если тру, начинаем заново
	if (restartQuestion) {
		
		//обнуляю радиобаттоны выбора установки
		byHand.checked = false;
		auto.checked = false;
		
		//обнуляю радиобаттоны выбора размера корабля
		fourDeckChoice.checked = false;
		threeDeckChoice.checked = false;
		twoDeckChoice.checked = false;
		oneDeckChoice.checked = false;
		
		//очищаю массивы флотов
		playerFleet.length = 0;
		compFleet.length = 0;
		
		//свободных ячеек
		playerSells.length = 0;
		compSells.length = 0;
		
		//свободных ячеек для установки
		playerSellsToInstal.length = 0;
		compSellsToInstal.length = 0;
		
		//обнуляю значение раненой ячейки
		woundedSellId = -1;
		
		//обнуляю значение выбора
		choice = 0;
		
		//скрываю блоки инфо установки
		infoAndChoice.style.display = "none";
		infoAutoInstall.style.display = "none";
		
		//скрываю инфоблоки
		playerInfoBlock.style.display = "none";
		compInfoBlock.style.display = "none";
		
		//пишу первоначальные сообщения в инфоблоках
		playerInfoBlock.innerHTML = "Ждёмс";
		compInfoBlock.innerHTML = "Ну же, стреляй!";
		
		//скрываю кнопки старта, рестарта, переустановки
		startButtonBlock.style.display = "none";
		restartButtonBlock.style.display = "none";
		moveButtonBlock.style.display = "none";
		
		//возвращаю блок инсталяции
		installationChoice.style.display = "block";
		
		
		for (let i = 0; i <= 99; i++) {
			
			//для всех ячеек класc свобожных
			playerPlayingField.childNodes[i].classList = "sell";
			compPlayingField.childNodes[i].classList = "sell";
			
			//для всех ячеек пустые вложения
			playerPlayingField.childNodes[i].innerHTML = "";
			compPlayingField.childNodes[i].innerHTML = "";
			
			//убираю подписки со всех ячеек
			playerPlayingField.childNodes[i].removeEventListener("click", putShip);
			playerPlayingField.childNodes[i].removeEventListener("contextmenu", turnShip);
			compPlayingField.childNodes[i].removeEventListener("click", checkCompSell);
			
			//заполняю массивы свободных ячеек
			playerSells.push(i);
			compSells.push(i);
			
			//заполняю массивы свободных для установкиячеек
			playerSellsToInstal.push(i);
			compSellsToInstal.push(i);
			
		}
		
	}
	
}


//РАНДОМНАЯ УСТАНОВКА КОРАБЛЕЙ ИГРОКА

//автоматически рандомно устанавливаю корабли игрока
function autoInstalPlayerShips() {
	
	autoInstalFourDeckPlayerShip();
	
	for (let k = 0; k < 2; k++) {
		autoInstalTwoThreeDeckPlayerShip(3);
	}
	
	for (let k = 0; k < 3; k++) {
		autoInstalTwoThreeDeckPlayerShip(2);
	}
	
	for (let k = 0; k < 4; k++) {
		autoInstalOneDeckPlayerShip();
	}
	
	infoAutoInstall.style.display = "none";
	startButtonBlock.style.display = "block";
	moveButtonBlock.style.display = "block";
	
}


//автоматически рандомно ставим четырехпалубный корабль игроку
function autoInstalFourDeckPlayerShip() {
	
	//массив хороших клеток, куда можно поставить головную ячейку корабля
	//== все свободные ячейки - ячейкив правом нижнем углу
	let goodSells = [];
	let badSells = [77, 78, 79, 87, 88, 89, 97, 98, 99];
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, playerSellsToInstal);
	
	//убираю плохие ячейки
	for (let key of badSells){
		goodSells = deleteNumberFromArr(key, ...goodSells);
	}
	
	//рандомно определяю направление 0 - вправо, 1 - вниз
	let direction = getRandomNumber(0, 1);
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки 
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	//вспомогательные переменные для границ для головной ячейки
	let n = 3;
	let k = Math.floor(goodSells[i] / 10) * 10;
	let m = k + 6;
	
	//проверяю направление, потом, что не выходит за границы поля,
	//если выходит, то меняю направление
	if (direction) {
		
		if (goodSells[i] <= 69) {
			autoPutDownPlayerShip(4, goodSells[i]);
		} else {
			autoPutRightPlayerShip(4, goodSells[i]);
		}
		
	} else {
		
		if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
			autoPutRightPlayerShip(4, goodSells[i]);
		} else {
			autoPutDownPlayerShip(4, goodSells[i]);
		}
		
	}
	
}


//автоматически рандомно ставим трех/двупалубный корабль игроку,
//в зависимости от переданного размера
function autoInstalTwoThreeDeckPlayerShip(a) {
	
	//маркер неудачной установки, 0 - удачно, 1 - неудачно
	let check = 0;
	
	//массив хороших клеток, куда можно поставить головную ячейку корабля
	//== все свободные ячейки - ячейкив правом нижнем углу
	let goodSells = [];
	let badSells = [88, 89, 98, 99]
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, playerSellsToInstal);
	
	//убираю плохие ячейки, если двупалубный, то одну ячейку, если трех, то 4 ячейки
	if (a == 2) {
		goodSells = deleteNumberFromArr(99, ...goodSells);
	} else {
		for (let key of badSells){
			goodSells = deleteNumberFromArr(key, ...goodSells);
		}
	}
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки 
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	//рандомно определяю направление 0 - вправо, 1 - вниз
	let direction = getRandomNumber(0, 1);
	
	//вспомогательные переменные для границ для головной ячейки
	let n = a - 1;
	let k = Math.floor(goodSells[i] / 10) * 10;
	let m = k + 10 - a;
	
	//проверяю направление, потом, что не выходит за границы поля
	//если выходит, то меняю направление
	//потом, что не пересекается с имеющимися кораблями
	//если пересекается, тоже меняю направление и также проверяю на выход за границы и пересечение,
	//если поставить не удалось, удаляю ячейку из хороших и меняю маркер о неудачной установки
	if (direction) {
		
		if (goodSells[i] <= (99 - 10 * n)) {
			
			if (checkSellsShipDownForCross(a, goodSells[i])){
				autoPutDownPlayerShip(a, goodSells[i]);
			} else if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
				
				if (checkSellsShipRightForCross(a, goodSells[i])) {
					autoPutRightPlayerShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		} else {
			
			if (checkSellsShipRightForCross(a, goodSells[i])) {
				autoPutRightPlayerShip(a, goodSells[i]);
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		}
		
	} else {
		
		if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
			
			if (checkSellsShipRightForCross(a, goodSells[i])) {
				autoPutRightPlayerShip(a, goodSells[i]);
			} else if (goodSells[i] <= (99 - 10 * n)) {
				
				if (checkSellsShipDownForCross(a, goodSells[i])) {
					autoPutDownPlayerShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		} else {
			
			if (checkSellsShipDownForCross(a, goodSells[i])) {
				autoPutDownPlayerShip(a, goodSells[i]);
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		}
		
	}
	
	//при неужачной установкеповторяю процесс, пока не добьюсь удачной
	while(check) {
		
		check = 0;
		
		direction = getRandomNumber(0, 1);
		
		i = getRandomNumber(0, (goodSells.length - 1));
		
		k = Math.floor(goodSells[i] / 10) * 10;
		m = k + 10 - a;
		
		if (direction) {
			
			if (goodSells[i] <= (99 - 10 * n)) {
				
				if (checkSellsShipDownForCross(a, goodSells[i])){
					autoPutDownPlayerShip(a, goodSells[i]);
				} else if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
					
					if (checkSellsShipRightForCross(a, goodSells[i])) {
						autoPutRightPlayerShip(a, goodSells[i]);
					} else {
						check = 1;
						goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
					}
					
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				
				if (checkSellsShipRightForCross(a, goodSells[i])) {
					autoPutRightPlayerShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			}
			
		} else {
			
			if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
				
				if (checkSellsShipRightForCross(a, goodSells[i])) {
					autoPutRightPlayerShip(a, goodSells[i]);
				} else if (goodSells[i] <= (99 - 10 * n)) {
					
					if (checkSellsShipDownForCross(a, goodSells[i])) {
						autoPutDownPlayerShip(a, goodSells[i]);
					} else {
						check = 1;
						goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
					}
					
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				
				if (checkSellsShipDownForCross(a, goodSells[i])) {
					autoPutDownPlayerShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			}
			
		}
	}
	
}


//автоматически рандомно ставим однопалубный корабль игроку
function autoInstalOneDeckPlayerShip() {
	
	let goodSells = [];
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, playerSellsToInstal);
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	autoPutDownPlayerShip(1, goodSells[i]);
	
}


//устанавливаю корабль вниз в поле игрока при автоматической установке
//на входе размер корабля и номер головной ячейки
function autoPutDownPlayerShip(a, i) {
	
	//отрисовываю корабль, "отрисовываю" невидимым битые клетки вокруг корабля
	paintLivingShip(...getSellsShipDown(a, i));
	paintRedZoneInvisibleAroundShip(...getSellsRedZoneShipDown(a, i));
	
	//добавляю орабль во флот игрока
	pushShipInPlayerFleet(a, i, ...getSellsShipDown(a, i));
	
	//убираю ячейки корабля и ячейки вокруг из свободных для установки ячеек
	for (let key of getSellsShipDown(a, i)){
		playerSellsToInstal = deleteNumberFromArr(key, ...playerSellsToInstal);
	}
	
	for (let key of getSellsRedZoneShipDown(a, i)) {
		playerSellsToInstal = deleteNumberFromArr(key, ...playerSellsToInstal);
	}
	
}


//устанавливаю корабль вправо в поле игрока при автоматической установке
//на входе размер корабля и номер головной ячейки
function autoPutRightPlayerShip(a, i) {
	
	//отрисовываю корабль, "отрисовываю" невидимым битые клетки вокруг корабля
	paintLivingShip(...getSellsShipRight(a, i));
	paintRedZoneInvisibleAroundShip(...getSellsRedZoneShipRight(a, i));
	
	//добавляю орабль во флот игрока
	pushShipInPlayerFleet(a, i, ...getSellsShipRight(a, i));
	
	//убираю ячейки корабля и ячейки вокруг из свободных для установки ячеек
	for (let key of getSellsShipRight(a, i)) {
		playerSellsToInstal = deleteNumberFromArr(key, ...playerSellsToInstal);
	}
	
	for (let key of getSellsRedZoneShipRight(a, i)) {
		playerSellsToInstal = deleteNumberFromArr(key, ...playerSellsToInstal);
	}

}


//рандомно перестанавливем корабли
function moveShips() {
	
	//очищаю массивы всех ячеек, всех ячеек доступных для утановки
	//флот игрока
	playerSellsToInstal.length = 0;
	playerFleet.length = 0;
	
	//заново заполняю массивы всех ячеек и всех ячеек доступных для утановки
	for (let i = 0; i <= 99; i++) {
		playerSellsToInstal.push(i);
	}
	
	//все ячейки переопределяю как свободные
	paintSellsLikeSea(...playerSells);
	
	//рандомно расставляю корабли
	autoInstalPlayerShips();
	
}


//РАНДОМНАЯ УСТАНОВКА КОРАБЛЕЙ КОМПА

//автоматически рандомно устанавливаю корабли компа
function autoInstalCompShips() {
	
	autoInstalFourDeckCompShip();
	
	for (let k = 0; k < 2; k++) {
		autoInstalTwoThreeDeckCompShip(3);
	}
	
	for (let k = 0; k < 3; k++) {
		autoInstalTwoThreeDeckCompShip(2);
	}
	
	for (let k = 0; k < 4; k++) {
		autoInstalOneDeckCompShip();
	}
	
}


//автоматически рандомно ставим четырехпалубный корабль компу
function autoInstalFourDeckCompShip() {
	
	//массив хороших клеток, куда можно поставить головную ячейку корабля
	//== все свободные ячейки - ячейкив правом нижнем углу
	let goodSells = [];
	let badSells = [77, 78, 79, 87, 88, 89, 97, 98, 99];
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, compSellsToInstal);
	
	//убираю плохие ячейки
	for (let key of badSells){
		goodSells = deleteNumberFromArr(key, ...goodSells);
	}
	
	//рандомно определяю направление 0 - вправо, 1 - вниз
	let direction = getRandomNumber(0, 1);
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки 
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	//вспомогательные переменные для границ для головной ячейки
	let n = 3;
	let k = Math.floor(goodSells[i] / 10) * 10;
	let m = k + 6;
	
	//проверяю направление, потом, что не выходит за границы поля,
	//если выходит, то меняю направление
	if (direction) {
		
		if (goodSells[i] <= 69) {
			autoPutDownCompShip(4, goodSells[i]);
		} else {
			autoPutRightCompShip(4, goodSells[i]);
		}
		
	} else {
		
		if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
			autoPutRightCompShip(4, goodSells[i]);
		} else {
			autoPutDownCompShip(4, goodSells[i]);
		}
		
	}
	
}


//автоматически рандомно ставим трех/двупалубный корабль игроку,
//в зависимости от переданного размера
function autoInstalTwoThreeDeckCompShip(a) {
	
	//маркер неудачной установки, 0 - удачно, 1 - неудачно
	let check = 0;
	
	//массив хороших клеток, куда можно поставить головную ячейку корабля
	//== все свободные ячейки - ячейкив правом нижнем углу
	let goodSells = [];
	let badSells = [88, 89, 98, 99]
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, compSellsToInstal);
	
	//убираю плохие ячейки, если двупалубный, то одну ячейку, если трех, то 4 ячейки
	if (a == 2) {
		goodSells = deleteNumberFromArr(99, ...goodSells);
	} else {
		for (let key of badSells){
			goodSells = deleteNumberFromArr(key, ...goodSells);
		}
	}
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки 
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	//рандомно определяю направление 0 - вправо, 1 - вниз
	let direction = getRandomNumber(0, 1);
	
	//вспомогательные переменные для границ для головной ячейки
	let n = a - 1;
	let k = Math.floor(goodSells[i] / 10) * 10;
	let m = k + 10 - a;
	
	//проверяю направление, потом, что не выходит за границы поля
	//если выходит, то меняю направление
	//потом, что не пересекается с имеющимися кораблями
	//если пересекается, тоже меняю направление и также проверяю на выход за границы и пересечение,
	//если поставить не удалось, удаляю ячейку из хороших и меняю маркер о неудачной установки
	if (direction) {
		
		if (goodSells[i] <= (99 - 10 * n)) {
			
			if (checkSellsCompShipDownForCross(a, goodSells[i])){
				autoPutDownCompShip(a, goodSells[i]);
			} else if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
				
				if (checkSellsCompShipRightForCross(a, goodSells[i])) {
					autoPutRightCompShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		} else {
			
			if (checkSellsCompShipRightForCross(a, goodSells[i])) {
				autoPutRightCompShip(a, goodSells[i]);
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		}
		
	} else {
		
		if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
			
			if (checkSellsCompShipRightForCross(a, goodSells[i])) {
				autoPutRightCompShip(a, goodSells[i]);
			} else if (goodSells[i] <= (99 - 10 * n)) {
				
				if (checkSellsCompShipDownForCross(a, goodSells[i])) {
					autoPutDownCompShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		} else {
			
			if (checkSellsCompShipDownForCross(a, goodSells[i])) {
				autoPutDownCompShip(a, goodSells[i]);
			} else {
				check = 1;
				goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
			}
			
		}
		
	}
	
	//при неужачной установкеповторяю процесс, пока не добьюсь удачной
	while(check) {
		
		check = 0;
		
		direction = getRandomNumber(0, 1);
		
		i = getRandomNumber(0, (goodSells.length - 1));
		
		k = Math.floor(goodSells[i] / 10) * 10;
		m = k + 10 - a;
		
		if (direction) {
			
			if (goodSells[i] <= (99 - 10 * n)) {
				
				if (checkSellsCompShipDownForCross(a, goodSells[i])){
					autoPutDownCompShip(a, goodSells[i]);
				} else if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
					
					if (checkSellsCompShipRightForCross(a, goodSells[i])) {
						autoPutRightCompShip(a, goodSells[i]);
					} else {
						check = 1;
						goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
					}
					
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				
				if (checkSellsCompShipRightForCross(a, goodSells[i])) {
					autoPutRightCompShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			}
			
		} else {
			
			if ((goodSells[i] >= k) && (goodSells[i] <= m)) {
				
				if (checkSellsCompShipRightForCross(a, goodSells[i])) {
					autoPutRightCompShip(a, goodSells[i]);
				} else if (goodSells[i] <= (99 - 10 * n)) {
					
					if (checkSellsCompShipDownForCross(a, goodSells[i])) {
						autoPutDownCompShip(a, goodSells[i]);
					} else {
						check = 1;
						goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
					}
					
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			} else {
				
				if (checkSellsCompShipDownForCross(a, goodSells[i])) {
					autoPutDownCompShip(a, goodSells[i]);
				} else {
					check = 1;
					goodSells = deleteNumberFromArr(goodSells[i], ...goodSells);
				}
				
			}
			
		}
	}
	
}


//автоматически рандомно ставим однопалубный корабль игроку
function autoInstalOneDeckCompShip() {
	
	let goodSells = [];
	
	//массив хороших ячеек заполняю из массива свободных ячеек
	Array.prototype.push.apply(goodSells, compSellsToInstal);
	
	//рандомно определяю номер элемента массива хороших ячеек,
	//в котором номер головной ячейки указан номер головной ячейки
	let i = getRandomNumber(0, (goodSells.length - 1));
	
	autoPutDownCompShip(1, goodSells[i]);
	
}


//устанавливаю корабль вниз в поле игрока при автоматической установке
//на входе размер корабля и номер головной ячейки
function autoPutDownCompShip(a, i) {
	
	//отрисовываю корабль, "отрисовываю" невидимым битые клетки вокруг корабля
	paintLivingCompShip(...getSellsShipDown(a, i));
	paintRadZoneAroundCompShip(...getSellsRedZoneShipDown(a, i));
	
	//добавляю орабль во флот игрока
	pushShipInCompFleet(a, i, ...getSellsShipDown(a, i));
	
	//убираю ячейки корабля и ячейки вокруг из свободных для установки ячеек
	for (let key of getSellsShipDown(a, i)){
		compSellsToInstal = deleteNumberFromArr(key, ...compSellsToInstal);
	}
	
	for (let key of getSellsRedZoneShipDown(a, i)) {
		compSellsToInstal = deleteNumberFromArr(key, ...compSellsToInstal);
	}
	
}


//устанавливаю корабль вправо в поле игрока при автоматической установке
//на входе размер корабля и номер головной ячейки
function autoPutRightCompShip(a, i) {
	
	//отрисовываю корабль, "отрисовываю" невидимым битые клетки вокруг корабля
	paintLivingCompShip(...getSellsShipRight(a, i));
	paintRadZoneAroundCompShip(...getSellsRedZoneShipRight(a, i));
	
	//добавляю орабль во флот игрока
	pushShipInCompFleet(a, i, ...getSellsShipRight(a, i));
	
	//убираю ячейки корабля и ячейки вокруг из свободных для установки ячеек
	for (let key of getSellsShipRight(a, i)) {
		compSellsToInstal = deleteNumberFromArr(key, ...compSellsToInstal);
	}
	
	for (let key of getSellsRedZoneShipRight(a, i)) {
		compSellsToInstal = deleteNumberFromArr(key, ...compSellsToInstal);
	}

}



//УСТАНОВКА КОРАБЛЕЙ ИГРОКА В РУЧНУЮ

//выбираю какой карабль ставить
function makeChoice(){
	
	//один раз при первом выборе все ячейки подписываю на собития ЛКМ и ПКМ
	if (choice == 0) {
		for (let i = 0; i <= 99; i++) {
			playerPlayingField.childNodes[i].addEventListener("click", putShip);
			
			playerPlayingField.childNodes[i].addEventListener("contextmenu", turnShip);
		}
	}
	
	if (fourDeckChoice.checked) {
		choice = 4;
	} else if (threeDeckChoice.checked) {
		choice = 3;
	} else if (twoDeckChoice.checked) {
		choice = 2;
	} else if (oneDeckChoice.checked) {
		choice = 1;
	}
	
}


//расставляю/удаляю корабли по клику на ячейку
function putShip() {
	
	//определяю ячейку как цель
	let clickSell = event.target;
	
	//если ячейка уже является головной ячейкой корабля
	//и размер корабля совпадает с текущим выбором, то удаляю корабль,
	//если пустая ячейка, то ставлю корабль
	if (checkHeadSell(+clickSell.id) && (getSellsByHead(+clickSell.id).length == choice)) {
		
		removeShip(+clickSell.id);
		
	} else {
		selectPositionShip(choice, +clickSell.id);
		
		//если установлены 10 кораблей, то показываю кнопку старт
		if (playerFleet.length == 10) {
			startButtonBlock.style.display = "block";
		}
	}
	
}


//удаляем установленнфй корабль, на входе номер головной ячейки
function removeShip(i) {
	
	//очищаю ячейки корабля и вокруг
	clearSells(i);
	
	//удаляю корабль из флота
	spliceShipOutPlayerFleet(i);
	
	//скрываю кнопку старт, на случай, ели удалялся 10й корабль
	startButtonBlock.style.display = "none";

}


//поворачиваем корабль
function turnShip() {
	
	//определяю ячейку как цель и беру её id
	let clickSell = event.target;
	let i = +clickSell.id;
	
	//проверяю, что головная ячейка корабля
	if (checkHeadSell(i)) {
		
		//определяю размер выбранного корабля и его направление
		let a = getSellsByHead(i).length;
		let c = getSellsByHead(i)[1] - getSellsByHead(i)[0];
		
		//вспомогательные переменные для границ для головной ячейки
		let n = a - 1;
		let k = Math.floor(i/10)*10;
		let m = k + 9 - n;
		
		//проверяю направление корабля, с == 10 значит вниз
		if (c == 10) {
			
			//проверяю, что после поворота не выходит за границы,
			//иначе пишу алерт
			if ((i >= k) && (i <= m)) {
				
				//стираю имеющиеся ячейки, иначе не пройти проверку на пересечение
				clearSells(i);
				
				//проверяю на пересечение, если порядок,
				//то удаляю корабль из флота,
				//рисую его развернутым и снова добавляю во флот с новыми ячейками,
				//при пересечении заново его отрисовываю и пишу алерт
				if (checkSellsShipRightForCross(a, i)) {
					
					spliceShipOutPlayerFleet(i)
					
					painShipAndRadZoneRight(a, i);
					pushShipInPlayerFleet(a, i, ...getSellsShipRight(a, i));
				} else {
					painShipAndRadZoneDown(a, i);
					alert("Нельзя повернуть корабль");
				}
				
			} else {
				alert("Нельзя повернуть корабль");
			}
			
		// если с != 10, значит корабль смотрит в право	
		} else {
			
			//проверяю, что после поворота не выходит за границы,
			//иначе пишу алерт
			if (i <= (99 - 10 * n)) {
				
				//стираю имеющиеся ячейки, иначе не пройти проверку на пересечение
				clearSells(i);
				
				//проверяю на пересечение, если порядок,
				//то удаляю корабль из флота,
				//рисую его развернутым и снова добавляю во флот с новыми ячейками,
				//при пересечении заново его отрисовываю и пишу алерт
				if (checkSellsShipDownForCross(a, i)) {
					
					spliceShipOutPlayerFleet(i)
					
					painShipAndRadZoneDown(a, i);
					
					pushShipInPlayerFleet(a, i, ...getSellsShipDown(a, i));
				} else {
					painShipAndRadZoneRight(a, i);
					alert("Нельзя повернуть корабль");
				}
				
			} else {
				alert("Нельзя повернуть корабль");
			}
		
		}
		
	}
	
}


//выбираю позицию корабля, на входе размер и номер головной ячейки
function selectPositionShip(a, i) {
	
	//проверяю число уже установленных кораблей такого размера,
	//если лимит исчерапан пишу алерт
	if (checkDeck(a)) {
		
		//по классу выбранной ячейки проверю свободна яили нет,
		//иначе пишу алерт
		if (playerPlayingField.childNodes[i].classList == "sell") {
			
			//вспомогательные переменные для границ для головной ячейки
			let n = a - 1;
			let k = Math.floor(i/10)*10;
			let m = k + 9 - n;
			
			//проверяю, что корабль не выходит за границы поля
			//если не выходит, то проверяю, что не пересекается с имеющимися кораблями
			//если порядок то рисую и добавляю во флот игрока,
			//если выходит за границы, или есть пересечения,
			//то поворячиваю корабль и так же проверяю на выход за границы и пересечения
			//если порядок рисую и добавляю во флот, если нет, пишу алерт
			if (i <= (99 - 10 * n)) {
				
				if (checkSellsShipDownForCross(a, i)){
					painShipAndRadZoneDown(a, i);
					pushShipInPlayerFleet(a, i, ...getSellsShipDown(a, i));
				} else if (checkSellsShipRightForCross(a, i)) {
					
					if (i <= m) {
						painShipAndRadZoneRight(a, i);
						pushShipInPlayerFleet(a, i, ...getSellsShipRight(a, i));
					} else {
						alert("Здесь нельзя поставить этот корабль");
					}
					
				} else {
					alert("Здесь нельзя поставить этот корабль");
				}
			
			} else if ((i >= k) && (i <= m)) {
				
				if (checkSellsShipRightForCross(a, i)){
					painShipAndRadZoneRight(a, i);
					pushShipInPlayerFleet(a, i, ...getSellsShipRight(a, i));
				} else {
					alert("Здесь нельзя поставить этот корабль");
				}
			
			} else {
				alert("Здесь нельзя поставить этот корабль");
			}
			
		} else {
			alert("Здесь нельзя поставить этот корабль");
		}
		
	} else {
		alert("Больше нельзя поставить корабль такого размера")
	}
	
}


//очищаю ячейки
function clearSells(i) {
	
	//очищаю ячейки корабля, передаю массив ячеек поределённых по голове
	paintSellsLikeSea(...getSellsByHead(i));
	
	//очищаю ячейки вокруг, передаю массив ячеек вокруг каждой ячейки корабля 
	paintSellsLikeSea(...getSellsRedZoneRemoveInSea(...getSellsByHead(i)));
	
}


//ОПРЕДЕЛЕНИЕ КАКИЕ ЯЧЕЙКИ КАК КРАСИТЬ

//рисую корабль с красной зоной вниз, на входе размер и головная ячейка
function painShipAndRadZoneDown(a, i) {
	
	paintLivingShip(...getSellsShipDown(a, i));
	paintRadZoneAroundShip(...getSellsRedZoneShipDown(a, i));
	
}


//рисую корабль с красной зоной вправо, на входе размер и головная ячейка
function painShipAndRadZoneRight(a, i) {
	
	paintLivingShip(...getSellsShipRight(a, i));
	paintRadZoneAroundShip(...getSellsRedZoneShipRight(a, i));
	
}


//определяю клетки корабля вниз, на входе размер и головная ячейка
function getSellsShipDown(a, i) {
	
	//массив для записи ячеек корабля
	let sellsShip = [];
	
	//начиная с головной ячейки и следующие а через 10
	//записываю в массив
	for (let k = 0; k < a; k++) {
		sellsShip.push(i + 10 * k);
	}
	
	return sellsShip;
	
}


//определяю клетки корабля вправо, на входе размер и головная ячейка
function getSellsShipRight(a, i) {
	
	//массив для записи ячеек корабля
	let sellsShip = [];
	
	//начиная с головной ячейки и следующие а записываю в массив
	for (let k = 0; k < a; k++) {
		sellsShip.push(i + k);
	}
	
	return sellsShip;
	
}


//определяю ячейки по сторонам, на входе номер ячейки
function getSellsAroundBySide(i) {
	
	//массив для записи подходящих ячеек
	let sellsAround = [];
	
	//провряю, у какого края поля ячейка,
	//в зависимости от этого беру ячейки вокруг,
	//если не у края то все вокруг закидываю в массив
	if (i < 10) {
		
		if (i == 0) {
			sellsAround = [1, 10];
		} else if (i == 9) {
			sellsAround = [8, 19];
		} else {
			
			sellsAround.push(i - 1, i + 1, i + 10);
			
		}
		
	} else if (i >= 90) {
		
		if (i == 90) {
			sellsAround = [80, 91];
		} else if (i == 99) {
			sellsAround = [89, 98];
		} else {
			
			sellsAround.push(i - 10, i - 1, i + 1);
			
		}
		
	} else {
		
		if (!(i % 10)) {
			
			sellsAround.push(i - 10, i + 1, i + 10);
			
		} else if ((i % 10) == 9) {
			
			sellsAround.push(i - 10, i - 1, i + 10);
			
		} else {
			
			sellsAround.push(i - 10, i - 1, i + 1, i + 10);
			
		}
		
	}
	
	return sellsAround;
	
}


//определяю ячейки покругу, на входе номер ячейки
function getSellsAround(i) {
	
	//массив для записи подходящих ячеек
	let sellsAround = [];
	
	//провряю, у какого края поля ячейка,
	//в зависимости от этого беру ячейки вокруг,
	//если не у края то все вокруг закидываю в массив
	if (i < 10) {
		
		if (i == 0) {
			sellsAround = [1, 10, 11];
		} else if (i == 9) {
			sellsAround = [8, 18, 19];
		} else {
			let m = i + 9;
			
			for (let k = 0; k < 3; k++) {
				sellsAround.push(m + k);
			}
			
			sellsAround.push(i - 1, i + 1);
		}
		
	} else if (i >= 90) {
		
		if (i == 90) {
			sellsAround = [80, 81, 91];
		} else if (i == 99) {
			sellsAround = [88, 89, 98];
		} else {
			let n = i - 11;
			
			for (let k = 0; k < 3; k++) {
				sellsAround.push(n + k);
			}
			
			sellsAround.push(i - 1, i + 1);
		}
		
	} else {
		
		if (!(i % 10)) {
			
			let n = i - 10;
			let m = i + 10;
			
			for (let k = 0; k < 2; k++) {
				sellsAround.push(n + k);
			}
			
			for (let k = 0; k < 2; k++) {
				sellsAround.push(m + k);
			}
			
			sellsAround.push(i + 1);
			
		} else if ((i % 10) == 9) {
			
			let n = i - 11;
			let m = i + 9;
			
			for (let k = 0; k < 2; k++) {
				sellsAround.push(n + k);
			}
			
			for (let k = 0; k < 2; k++) {
				sellsAround.push(m + k);
			}
			
			sellsAround.push(i - 1);
			
		} else {
			
			let n = i - 11;
			let m = i + 9;
			
			for (let k = 0; k < 3; k++) {
				sellsAround.push(n + k);
			}
			
			sellsAround.push(i - 1, i + 1);
			
			for (let k = 0; k < 3; k++) {
				sellsAround.push(m + k);
			}
			
		}
		
	}
	
	return sellsAround;
	
}


//определяю ячейки красной зоны для перекраски, на входе массив ячеека
function getSellsRedZoneRemoveInSea(...arr){
	
	//массив для записи подходящих ячеек
	let sellsToPain = [];
	
	//для каждой ячейки из входящего массива определяю массив окружающих ячеек
	for (let key of arr) {
		let aroundSellShip = getSellsAround(key);
		
		//для каждой я чейки из ранее полученного массива
		//определяю свой массив окружающих ячеек
		for (let item of aroundSellShip) {
			
			//маркер
			let check = 1;
			let aroundSellAroundSellShip = getSellsAround(item);
			
			//для каждой ячейки получившегося массива
			//проверяю, что это не ячейка самого корабля,
			//если совпадение, то меняю маркер
			for (let numb of aroundSellAroundSellShip) {
				if (playerPlayingField.childNodes[numb].classList == "livingShip") {
					check = 0;
					break;
				}
			}
			//если маркер не поменялся,
			//то записываю в массив подходящих ячеек, которые пойдут на перекраску
			if (check) {
				sellsToPain.push(item);
			}
		}
	}
	
	return sellsToPain;
	
}


//определяю клетки для красной зоны корабля вниз, на входе размер и головная ячейка
function getSellsRedZoneShipDown(a, i) {
	
	//массив для записи подходящих ячеек
	let sellsRedZone = [];
	
	//провряю, у какого края поля ячейка корабля,
	//в зависимости от этого беру ячейки вокруг,
	//если не у края то все вокруг закидываю в массив
	if (i < 10) {
		
		if (i == 0) {
			let n = i + 1;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i + 10 * a);
			
		} else if (i == 9) {
			let n = i - 1;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i + 10 * a);
			
		} else {
			let n = i - 1;
			let m = i + 1;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(m + 10 * k);
			}
			
			sellsRedZone.push(i + 10 * a);
		}
		
	} else if (i > (99 - 10 * a)) {
		
		if (!(i % 10)) {
			let n = i - 9;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
			
		} else if ((i % 10) == 9) {
			let n = i - 11;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
			
		} else {
			let n = i - 9;
			let m = i - 11;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(m + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
		}
		
	} else {
		
		if (!(i % 10)) {
			let n = i - 9;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
			sellsRedZone.push(i + 10 * a);
			
		} else if ((i % 10) == 9) {
			let n = i - 11;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
			sellsRedZone.push(i + 10 * a);
			
		} else {
			let n = i - 9;
			let m = i - 11;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + 10 * k);
			}
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(m + 10 * k);
			}
			
			sellsRedZone.push(i - 10);
			sellsRedZone.push(i + 10 * a);
		}
		
	}
	
	return sellsRedZone;
	
}


//определяю клетки для красной зоны корабля вправо, на входе размер и головная ячейка
function getSellsRedZoneShipRight(a, i) {
	
	//массив для записи подходящих ячеек
	let sellsRedZone = [];
	
	//провряю, у какого края поля ячейка корабля,
	//в зависимости от этого беру ячейки вокруг,
	//если не у края то все вокруг закидываю в массив
	if (i < 10) {
		
		if (i == 0) {
			let n = i + 10;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i + a);
			
		} else if (i == (10 - a)) {
			let n = i + 9;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i - 1);
			
		} else {
			let n = i + 9;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i - 1);
			sellsRedZone.push(i + a);
			
		}
		
	} else if (i >= 90) {
		
		if (i == 90) {
			let n = i - 10;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i + a);
			
		} else if (i == (100 - a)) {
			let n = i - 11;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i - 1);
			
		} else {
			let n = i - 11;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + k);
			}
			
			sellsRedZone.push(i - 1);
			sellsRedZone.push(i + a);
			
		}
		
	} else {
		
		if (!(i % 10)) {
			let n = i - 10;
			let m = i + 10;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(m + k);
			}
			
			sellsRedZone.push(i + a);
			
		} else if (((i + a - 1) % 10) == 9) {
			let n = i - 11;
			let m = i + 9;
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(n + k);
			}
			
			for (let k = 0; k <= a; k++) {
				sellsRedZone.push(m + k);
			}
			
			sellsRedZone.push(i - 1);
			
		} else {
			let n = i - 11;
			let m = i + 9;
			let b = a + 1;
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(n + k);
			}
			
			for (let k = 0; k <= b; k++) {
				sellsRedZone.push(m + k);
			}
			
			sellsRedZone.push(i - 1);
			sellsRedZone.push(i + a);
			
		}
	}
	
	return sellsRedZone;
	
}


//закрашиваю установленный корабль игрока зеленым
function paintLivingShip(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс живой ячейки корабля
	for (let key of arr) {
		playerPlayingField.childNodes[key].classList = "livingShip";
	}
	
}


//закрашиваю установленный корабль компа "зеленым"
function paintLivingCompShip(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс живой ячейки корабля
	for (let key of arr) {
		compPlayingField.childNodes[key].classList = "livingCompShip";
	}
	
}


//закрашиваю красную зону вокруг корабля игрока красным
function paintRadZoneAroundShip(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс видимая ячейка вокруг корабля
	for (let key of arr) {
		playerPlayingField.childNodes[key].classList = "redZone";
	}
	
}


//закрашиваю красную зону вокруг корабля компа красным как море
function paintRadZoneAroundCompShip(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс видимая ячейка вокруг корабля
	for (let key of arr) {
		compPlayingField.childNodes[key].classList = "redZoneInvisible";
	}
}


//закрашиваю красную зону вокруг корабля игрока как море
function paintRedZoneInvisibleAroundShip(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс невидимая ячейка вокруг корабля
	for (let key of arr) {
		playerPlayingField.childNodes[key].classList = "redZoneInvisible";
	}
	
}


//определяю ячейки поля игорока как свободные
function paintSellsLikeSea(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс обычная свободная ячейка
	for (let key of arr) {
		playerPlayingField.childNodes[key].classList = "sell";
	}
	
}


//определяю ячейки поля компа как свободные
function paintSellsLikeSeaCompField(...arr) {
	
	//для каждого элемента входящего массива
	//нахожу ячейку и определяю класс обычная свободная ячейка
	for (let key of arr) {
		compPlayingField.childNodes[key].classList = "sell";
	}
	
}


//проверяю на пересечение с другим кораблём игрока вниз, на входе размер и головная ячейка
function checkSellsShipDownForCross(a, i) {
	
	//маркер
	let check = 1;
	
	//для каждой следующей ячейки корабля проверяю,
	//что встаёт на свободную чейку
	//если не свободная, меняю маркер
	for (let k = 1; k < a; k++) {
		
		if (playerPlayingField.childNodes[i + k * 10].classList == "sell") {
			check = 1;
		} else {
			check = 0;
			break;
		}
		
	}
	
	if (check) {
		return true;
	} else {
		return false;
	}
	
}


//проверяю на пересечение с другим кораблём компа вниз, на входе размер и головная ячейка
function checkSellsCompShipDownForCross(a, i) {
	
	//маркер
	let check = 1;
	
	//для каждой следующей ячейки корабля проверяю,
	//что встаёт на свободную чейку
	//если не свободная, меняю маркер
	for (let k = 1; k < a; k++) {
		
		if (compPlayingField.childNodes[i + k * 10].classList == "sell") {
			check = 1;
		} else {
			check = 0;
			break;
		}
		
	}
	
	if (check) {
		return true;
	} else {
		return false;
	}
	
}


//проверяю на пересечение с другим кораблём игрока вправо
function checkSellsShipRightForCross(a, i) {
	
	//маркер
	let check = 1;
	
	//для каждой следующей ячейки корабля проверяю,
	//что встаёт на свободную чейку
	//если не свободная, меняю маркер
	for (let k = 1; k < a; k++) {
		
		if (playerPlayingField.childNodes[i + k].classList == "sell") {
			check = 1;
		} else {
			check = 0;
			break;
		}
		
	}
	
	if (check) {
		return true;
	} else {
		return false;
	}
	
}


//проверяю на пересечение с другим кораблём компа вправо
function checkSellsCompShipRightForCross(a, i) {
	
	//маркер
	let check = 1;
	
	//для каждой следующей ячейки корабля проверяю,
	//что встаёт на свободную чейку
	//если не свободная, меняю маркер
	for (let k = 1; k < a; k++) {
		
		if (compPlayingField.childNodes[i + k].classList == "sell") {
			check = 1;
		} else {
			check = 0;
			break;
		}
		
	}
	
	if (check) {
		return true;
	} else {
		return false;
	}
	
}


//начинаем игру по кнопке старт
function startGame() {
	
	//для поля игрока все ячейки красной зоны переопределяю как свободные
	paintOllSellsRadZoneLikeSea();
	
	//рандомно расставляю корабли у компа
	autoInstalCompShips();
	
	//для поля компа все ячейки красной зоны переопределяю как свободные
	paintOllSellsRadZoneLikeSeaCompField();
	
	//убираю кнопки старта, перестановки и выбора
	//покадываю блоки инфо у игрока и компа
	startButtonBlock.style.display = "none";
	moveButtonBlock.style.display = "none";
	infoAndChoice.style.display = "none";
	playerInfoBlock.style.display = "block";
	compInfoBlock.style.display = "block";
	
	//после ручной установки убираю кликабельность ячеек
	if (choice) {
		for (let i = 0; i <= 99; i++) {
			
			playerPlayingField.childNodes[i].removeEventListener("click", putShip);
			playerPlayingField.childNodes[i].removeEventListener("contextmenu", turnShip);
			
		}
	}
	
	for (let i = 0; i <= 99; i++) {
		compPlayingField.childNodes[i].addEventListener("click", checkCompSell);
	}
	
}


//удаляем ячейки короблей, установленных игроком из массива поля игрока
function deletePlayersSellsShipFromPlayerSells() {
	
	//для каждого элемента из массива флота
	//беру свойство с массивом ячеек и убирае их их массива свободных ячеек
	for (let j = 0; j < playerFleet.length; j++) {
		
		let deleteSells = playerFleet[j].sells;
		
		for (let item of deleteSells) {
			playerSells = deleteNumberFromArr(item, ...playerSells);
		}
		
	}
	
}


//все ячейки из красных зон меняю на свободные
function paintOllSellsRadZoneLikeSea() {
	
	//для каждого элемента из массива флота
	//беру свойство с значением головной ячейки, и свойство с размером крабля
	//по ней определяю ячейки красной зоны вокруг корабля
	//и определяю им класс свободных ячеек
	for (let j = 0; j < playerFleet.length; j++) {
		
		let i = playerFleet[j].headSell;
		let a = playerFleet[j].deck;
		
		//переменная для определения направления
		//из второго элемента массива ячеек корабля вычитаю пенрвый
		//если с == 10, то вниз, если == 1, то в право
		let c = getSellsByHead(i)[1] - getSellsByHead(i)[0];

		if (a > 1) {
			
			if (c == 10) {
				paintSellsLikeSea(...getSellsRedZoneShipDown(a, i));
			} else {
				paintSellsLikeSea(...getSellsRedZoneShipRight(a, i))
			}
			
		} else {
			paintSellsLikeSea(...getSellsRedZoneShipDown(a, i));
		}
		
	}
	
}


//все ячейки из красных зон меняю на свободные для поля компа
function paintOllSellsRadZoneLikeSeaCompField() {
	
	//для каждого элемента из массива флота
	//беру свойство с значением головной ячейки, и свойство с размером крабля
	//по ней определяю ячейки красной зоны вокруг корабля
	//и определяю им класс свободных ячеек
	for (let j = 0; j < compFleet.length; j++) {
		
		let i = compFleet[j].headSell;
		let a = compFleet[j].deck;
		
		//переменная для определения направления
		//из второго элемента массива ячеек корабля вычитаю пенрвый
		//если с == 10, то вниз, если == 1, то в право
		let c = getSellsByHeadCompFleet(i)[1] - getSellsByHeadCompFleet(i)[0];

		if (a > 1) {
			
			if (c == 10) {
				paintSellsLikeSeaCompField(...getSellsRedZoneShipDown(a, i));
			} else {
				paintSellsLikeSeaCompField(...getSellsRedZoneShipRight(a, i))
			}
			
		} else {
			paintSellsLikeSeaCompField(...getSellsRedZoneShipDown(a, i));
		}
		
	}
	
}



//СТРЕЛЯЕМ ПО КОРАБЛЯМ


//проверяем ячейки кома при выстреле
function checkCompSell() {
	
	//определяю ячейку как цель и беру её id
	let clickSell = event.target;
	let i = parseInt(clickSell.id);
	
	//по значению определяю номер элемента в массиве ячеек поля компа
	//и удаляю этот элемент
	compSells.splice(compSells.indexOf(i), 1);
	
	let ship = checkSellInCompShips(i);
	
	//проверяю, попал ли в свободную ячейку
	//если нет, высчитываю в какой корабль попал
	if (ship) {
		
		let shiplifeSells = ship.lifeSells;
		
		//по значению определяю номер элемента в массиве живых ячеек корабля
		//и удаляю этот элемент
		shiplifeSells.splice(shiplifeSells.indexOf(i), 1);
		
		//проверяю, сколько ячеек в массиве живых,
		//если остались, то корабль ранен,
		//если нет, то убит
		if (shiplifeSells.length) {
			
			//крашу ячейку корабля раненой
			compPlayingField.childNodes[i].classList = "woundedSell";
			
			//ставлю крестик в ячейке
			compPlayingField.childNodes[i].innerHTML = "\u274C";
		
			//отписываюсь от события по клику на ячейке
			compPlayingField.childNodes[i].removeEventListener("click", checkCompSell);
			
			//пишу в инфо, что ранен
			compInfoBlock.innerHTML = "Ранен!";
			
		} else {
			
			//ставлю крестик в ячейке
			compPlayingField.childNodes[i].innerHTML = "\u274C";
		
			//отписываюсь от события по клику на ячейке
			compPlayingField.childNodes[i].removeEventListener("click", checkCompSell);
			
			//крашу все ячейки корабля убитыми
			for (let key of ship.sells) {
				
				compPlayingField.childNodes[key].classList = "killedSell";
			}
			
			//переменные для параметров корабля
			let a = ship.deck;
			let b = ship.headSell;
			let c = getSellsByHeadCompFleet(b)[1] - getSellsByHeadCompFleet(b)[0];
			
			//определяю направление корабля
			//из второго элемента массива ячеек корабля вычитаю пенрвый
			//если с == 10, то вниз, если == 1, то в право
			//и помечаю ячейки вокруг корабля промахами
			// и удаляю их из массива ячеек компа
			if (c == 10) {
				
				let missSellsDown = getSellsRedZoneShipDown(a, b);
				
				putMissAroundKilledCompShip(...missSellsDown);
				
				for (let key of missSellsDown) {
					compSells = deleteNumberFromArr(key, ...compSells);
				}
				
			} else {
				
				let missSellsRight = getSellsRedZoneShipRight(a, b);
				
				putMissAroundKilledCompShip(...missSellsRight)
				
				for (let key of missSellsRight) {
					compSells = deleteNumberFromArr(key, ...compSells);
				}
				
			}
			
			//удаляю убитый корабль из флота
			spliceShipOutCompFleet(b);
			
			//если длина флота становится 0, то играза канчивается
			if (compFleet.length) {
				compInfoBlock.innerHTML = "Убит!";
			} else {
				
				compInfoBlock.innerHTML = "Убит! Флот уничтожен. Ты выиграл!";
				
				for (let i = 0; i <= 99; i++) {
					compPlayingField.childNodes[i].removeEventListener("click", checkCompSell);
				}
				
			}
			
		}
		
	} else {
		
		compInfoBlock.innerHTML = "Мимо! У меня всё ок)";
		//ставлю точку в ячейке
		compPlayingField.childNodes[i].innerHTML = "\u25CF";
		
		//отписываюсь от события по клику на ячейке
		compPlayingField.childNodes[i].removeEventListener("click", checkCompSell);
		
		compShoots();
		
	}
	
}


//проверяю есть ли ячейка в кораблях компа
function checkSellInCompShips(i) {
	
	//для каждого корабля проверяю налиие ячейки в массиве живых ячеек
	outer: for (let j = 0; j < compFleet.length; j++) {
		
		let shipSells = compFleet[j].sells;
		
		//проверяю наличие ячейки в массиве ячеек
		//при соответствии корабль со свойствами,
		//если нет, то возвращаю false
		for (let n = 0; n < shipSells.length; n++) {
			
			if (shipSells[n] == i) {
				return compFleet[j];
				
				//прерываю цикл по ячейкам корабля
				break;
				
				//прерываю цикл по массиву флота
				break outer;
			}
			
		}
		
	}
	
	return false;
	
}


//проставляю промахи вокруг убитого корабля компа
function putMissAroundKilledCompShip(...arr) {
	
	//для каждой ячейки с ид из массива ставлю значок промаха
	//и убираю подписку на клик
	for (let key of arr) {
		compPlayingField.childNodes[key].innerHTML = "\u25CF";
		
		compPlayingField.childNodes[key].removeEventListener("click", checkCompSell);
	}
	
}


//проставляю промахи вокруг убитого корабля игрока
function putMissAroundKilledPlayerShip(...arr) {
	
	//для каждой ячейки с ид из массива ставлю значок промаха
	for (let key of arr) {
		playerPlayingField.childNodes[key].innerHTML = "\u25CF";
	}
	
}


//комп стреляет по рандомной ячейке, проверяем на попадение
function compShoots() {
	
	restartButtonBlock.style.display = "none";
	
	//если есть раненая ячейки, то пытаемся стрелять в её соседей
	if (woundedSellId > 0) {
		
		compShootsToNeighbors(woundedSellId);
		
	} else {
		//если раненой ячейки нет,
		//стреляем рандомно по свободной
		
		//рандомный номер элемента из массива свободных ячеек
		let k = getRandomNumber(0, (playerSells.length - 1));
		
		//ид ячейки цели
		let i = playerSells[k];
		
		//удаляю ячейку цель из массива свободных
		playerSells.splice(k, 1);
		
		//вытаскиваем свойство корабля или false
		let ship = checkSellInPlayerShips(i);
		
		//если попал в корабль
		//если не попал, то ship false, помечаю как мимо
		if (ship) {
			
			//глушу ячейки поля компа
			//чтоб при паузе для показа подмитой клетки не накликать
			unsubscribeCompSells();
			
			//массив живых ячеек корабля
			let shiplifeSells = ship.lifeSells;
			
			//удаляю подбитую ячейку из живых
			shiplifeSells.splice(shiplifeSells.indexOf(i), 1);
			
			//проверяю длину массива живых
			//если не ноль, значит ранен, иначе убит
			if (shiplifeSells.length) {
				
				//крашу ячейку корабля раненой
				playerPlayingField.childNodes[i].classList = "woundedSell";
				
				//ставлю крестик в ячейке
				playerPlayingField.childNodes[i].innerHTML = "\u274C";
				
				//пишу в инфо, что ранен
				playerInfoBlock.innerHTML = "Ранен! Прицеливаюсь.";
				
				//с задержкой в 5с подписываю свободные ячейки поля компа на клики 
				setTimeout(subscribeCompSells, 3000);
				
				//через 5с снова стреляю,
				//чтоб было время посмотреть на раненый корабль
				setTimeout(compShootsToNeighbors, 3000, i);
				
			} else {
				
				//ставлю крестик в ячейке
				playerPlayingField.childNodes[i].innerHTML = "\u274C";
				
				//крашу все ячейки корабля убитыми
				for (let key of ship.sells) {
					
					playerPlayingField.childNodes[key].classList = "killedSell";
				}
				
				//переменные для параметров корабля
				let a = ship.deck;
				let b = ship.headSell;
				let c = getSellsByHead(b)[1] - getSellsByHead(b)[0];
				
				//определяю направление корабля
				//из второго элемента массива ячеек корабля вычитаю пенрвый
				//если с == 10, то вниз, если == 1, то в право
				//и помечаю ячейки вокруг корабля промахами
				// и удаляю их из массива ячеек компа
				if (c == 10) {
					
					let missSellsDown = getSellsRedZoneShipDown(a, b);
					
					putMissAroundKilledPlayerShip(...missSellsDown);
					
					for (let key of missSellsDown) {
						playerSells = deleteNumberFromArr(key, ...playerSells);
					}
					
				} else {
					
					let missSellsRight = getSellsRedZoneShipRight(a, b);
					
					putMissAroundKilledPlayerShip(...missSellsRight);
					
					for (let key of missSellsRight) {
						playerSells = deleteNumberFromArr(key, ...playerSells);
					}
					
				}
				
				//удаляю убитый корабль из флота
				spliceShipOutPlayerFleet(b);
				
				//проверяю размер флота,
				//если 0 то заканчиваю игру, поле компа больше не кликабельно
				if (playerFleet.length) {
					
					playerInfoBlock.innerHTML = "Убит! Прицеливаюсь.";
					
					//с задержкой в 5с подписываю свободные ячейки поля компа на клики 
					setTimeout(subscribeCompSells, 3000);
					
					//через 5с снова стреляю,
					//чтоб было время посмотреть на убитый корабль 
					setTimeout(compShoots, 3000);
					
				} else {
					playerInfoBlock.innerHTML = "Убит! Флот уничтожен. Ты проиграл!"
					
					restartButtonBlock.style.display = "block";
				}
				
			}	
			
		} else {
			
			//ставлю точку мимо
			playerPlayingField.childNodes[i].innerHTML = "\u25CF";
			
			//пишу в инфо
			playerInfoBlock.innerHTML = "Мимо! Всё ок)";
			
			restartButtonBlock.style.display = "block";
			
		}
		
	}
	
}


//стреляю по соседним клеткам если ранил
function compShootsToNeighbors(n) {
	
	//будущий ид ячейки цели
	let i;
	
	//vетка, нашли раненого 1, нет 0
	let check = 1;
	
	//значение десятка проверяемой ячейки
	let k = Math.floor(n / 10);
	let m = n % 10;
	
	//массив ячеек соседей по сторонам
	let aroundSells = getSellsAroundBySide(n);
	
	for (let p = 0; p < aroundSells.length; p++) {
		if (playerPlayingField.childNodes[aroundSells[p]].innerHTML == "\u25CF") {
			
			aroundSells.splice(p, 1);
			
			p--;
			
		}
	}
	
	//для каждой ячейки соседа проверяю нанение 
	outer: for (let key of aroundSells) {
		
		//переменная направление в какую сторону раненый сосед
		//10 - вверх, 1 - влево, -1 - вправо, -10 - вниз
		let pointer = n - key;
		
		if (playerPlayingField.childNodes[key].classList == "woundedSell") {
			
			//переменная направление в какую сторону раненый сосед
			//10 - вверх, 1 - влево, -1 - вправо, -10 - вниз
			//let pointer = n - key;
			
			//если направление вверх
			if (pointer == 10) {
				
				//проверяем где раненая ячейка
				if (k == 1) {
					//если ячейка во втором ряду
					//значит выше верхнего соседа граница
					
					//стреляем ниже раненой
					i = n + 10;
					
					//стреляю
					shootsToDownDirectionShip(i, n);
					
				} else if (playerPlayingField.childNodes[n - 20].innerHTML == "\u25CF") {
					//если ячейка над соседом я меет метку мимо
					
					//стреляем ниже раненой
					i = n + 10;
					
					//стреляю
					shootsToDownDirectionShip(i, n);
					
				} else if (playerSells.includes(n - 20)) {
					//если ячейка выше соседа входит в массив свободных
					//и проверяем что ячейка под первой раненой тоже свободна
					//и не за границей
					//рандомно определяем в какую стрелять
					
					if (k != 9) {
						
						if (playerPlayingField.childNodes[n + 10].innerHTML != "\u25CF") {
							
							let sellsForShot = [n - 20, n + 10];
						
							//определяю
							i = sellsForShot[getRandomNumber(0, 1)];
							
							//стреляю
							shootsToDownDirectionShip(i, n);
								
						} else {
							
							//стреляем выше раненой
							i = n - 20;
							
							//стреляю
							shootsToDownDirectionShip(i, n);
								
						}
						
						
					} else {
						
						//стреляем выше раненой
						i = n - 20;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					}
					
				} else {
					//значит ячейка выше соседа тоже раненая
					//3 раненых вряд, 4хпалубник, снова проверяем
					
					if (k == 2) {
						//если ячейка во третьем ряду
						//значит выше граница
						
						//стреляем ниже раненой
						i = n + 10;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					} else if (playerPlayingField.childNodes[n - 30].innerHTML == "\u25CF") {
						//если ячейка над 2мя ранеными я меет метку мимо
						
						//стреляем ниже раненой
						i = n + 10;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					} else {
						//если ячейка выше соседа входит в массив свободных
						//и проверяем что ячейка под первой раненой тоже свободна
						//и не за границей
						//рандомно определяем в какую стрелять
						
						if (k != 9) {
							
							if (playerPlayingField.childNodes[n + 10].innerHTML != "\u25CF") {
								
								let sellsForShot = [n - 30, n + 10];
								
								//определяю
								i = sellsForShot[getRandomNumber(0, 1)];
								
								//стреляю
								shootsToDownDirectionShip(i, n);
								
							} else {
								
								//стреляем выше раненой
								i = n - 30;
								
								//стреляю
								shootsToDownDirectionShip(i, n);
								
							}
							
						} else {
							
							//стреляем выше раненой
							i = n - 30;
							
							//стреляю
							shootsToDownDirectionShip(i, n);
							
						}
						
					}
					
				}
				
			} else if (pointer == 1) {
				//если направление влево
				
				//проверяем где раненая ячейка
				if (m == 1) {
					//ячейка во втором столбце
					//левее соседа граница
					
					//стреляем правее раненой
					i = n + 1;
					
					//стреляю
					shootsToRightDirectionShip(i, n);
					
				} else if (playerPlayingField.childNodes[n - 2].innerHTML == "\u25CF") {
					//ячейка левее соседа отмечена мимо
					
					//стреляем правее раненой
					i = n + 1;
					
					//стреляю
					shootsToRightDirectionShip(i, n);
					
				} else if (playerSells.includes(n - 2)) {
					//ячейка левее соседа свободна
					//проверяем, что ячейка правее раненой тоже
					//и не за границей
					//рандомно стреляю
					
					if (m != 9) {
						
						if (playerPlayingField.childNodes[n + 1].innerHTML != "\u25CF") {
							
							let sellsForShot = [n - 2, n + 1];
						
							//определяю
							i = sellsForShot[getRandomNumber(0, 1)];
							
							//стреляю
							shootsToRightDirectionShip(i, n);
							
						} else {
							
							//определяю
							i = n - 2;
							
							//стреляю
							shootsToRightDirectionShip(i, n);	
							
						}
						
					} else {
						
						//определяю
						i = n - 2;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					}
					
				} else {
					//ячейка левее соседа тоже ранена
					//3 раненых вряд, 4хпалубник, снова проверяем
					
					if (m == 2) {
						//проверяемая ячейка в 3 ряду
						//левее раненых соседей граница
						
						//стреляем правее раненой
						i = n + 1;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					} else if (playerPlayingField.childNodes[n - 3].innerHTML == "\u25CF") {
						//ячейка левее соседей отмечена мимо
						
						//стреляем правее раненой
						i = n + 1;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					} else {
						//ячейка левее соседей свободна
						//проверяем, что ячейка правее раненой тоже
						//и не за границей
						//рандомно стреляю
						
						if (m != 9) {
							
							if (playerPlayingField.childNodes[n + 1].innerHTML != "\u25CF") {
								
								let sellsForShot = [n - 3, n + 1];
								
								//определяю
								i = sellsForShot[getRandomNumber(0, 1)];
								
								//стреляю
								shootsToRightDirectionShip(i, n);	
								
							} else {
								
								//определяю
								i = n - 3;
								
								//стреляю
								shootsToRightDirectionShip(i, n);
								
							}
							
						} else {
							
							//определяю
							i = n - 3;
							
							//стреляю
							shootsToRightDirectionShip(i, n);
							
						}
						
					}
					
				} 
				
			} else if (pointer == -1) {
				//если направление вправо
				
				if (m == 8) {
					//проверяемая ячейка во втором справа ряду
					//провее соседа граница
					
					//стреляем левее раненой
					i = n - 1;
					
					//стреляю
					shootsToRightDirectionShip(i, n);
					
				} else if (playerPlayingField.childNodes[n + 2].innerHTML == "\u25CF") {
					//ячейка правее соседа отмечена мимо
					
					//стреляем левее раненой
					i = n - 1;
					
					//стреляю
					shootsToRightDirectionShip(i, n);
					
				} else if (playerSells.includes(n + 2)) {
					//ячейка правее соседа свободна
					//проверяем, что ячейка левее раненой тоже
					//и не за границей
					//рандомно стреляю
					
					if (m != 1) {
						
						if (playerPlayingField.childNodes[n - 1].innerHTML != "\u25CF") {
							
							let sellsForShot = [n - 1, n + 2];
							
							//определяю
							i = sellsForShot[getRandomNumber(0, 1)];
							
							//стреляю
							shootsToRightDirectionShip(i, n);
							
						} else {
							
							//определяю
							i = n + 2;
							
							//стреляю
							shootsToRightDirectionShip(i, n);
							
						}
						
					} else {
						
						//определяю
						i = n + 2;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					}
					
				} else {
					//ячейка правее соседа тоже ранена
					//3 раненых вряд, 4хпалубник, снова проверяем
					
					if (m == 7) {
						//проверяемая ячейка во втором с права ряду
						//провее соседа граница
						
						//стреляем левее раненой
						i = n - 1;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					} else if (playerPlayingField.childNodes[n + 3].innerHTML == "\u25CF") {
						//ячейка правее соседей отмечена мимо
						
						//стреляем правее раненой
						i = n - 1;
						
						//стреляю
						shootsToRightDirectionShip(i, n);
						
					} else {
						//ячейка правее соседей свободна
						//проверяем, что ячейка левее раненой тоже
						//и не за границей
						//рандомно стреляю
						
						if (m != 1) {
							
							if (playerPlayingField.childNodes[n - 1].innerHTML != "\u25CF") {
								
								let sellsForShot = [n - 1, n + 3];
								
								//определяю
								i = sellsForShot[getRandomNumber(0, 1)];
								
								//стреляю
								shootsToRightDirectionShip(i, n);
								
							} else {
								
								//определяю
								i = n + 3;
								
								//стреляю
								shootsToRightDirectionShip(i, n);
								
							}
							
						} else {
							
							//определяю
							i = n + 3;
							
							//стреляю
							shootsToRightDirectionShip(i, n);
							
						}
						
					}
					
				}
				
			} else if (pointer == -10) {
				//если направление вниз
				
				if (k == 8) {
					//проверяемая ячейка во втором снизу ряду
					//ниже соседа граница
					
					//стреляем выше раненой
					i = n - 10;
					
					//стреляю
					shootsToDownDirectionShip(i, n);
					
				} else if (playerPlayingField.childNodes[n + 20].innerHTML == "\u25CF") {
					//ячейка ниже соседа отмечена мимо
					
					//стреляем выше раненой
					i = n - 10;
					
					//стреляю
					shootsToDownDirectionShip(i, n);
					
				} else if (playerSells.includes(n + 20)) {
					//ячейка ниже соседа свободна
					//проверяю, что ячейка выше раненой тоже
					//и не за границей
					//рандомно стреляю
					
					if (k != 1) {
						
						if (playerPlayingField.childNodes[n - 10].innerHTML != "\u25CF") {
							
							let sellsForShot = [n - 10, n + 20];
						
							//определяю
							i = sellsForShot[getRandomNumber(0, 1)];
							
							//стреляю
							shootsToDownDirectionShip(i, n);
							
						} else {
							
							i = n + 20;
							
							//стреляю
							shootsToDownDirectionShip(i, n);
							
						}
						
					} else {
						
						i = n + 20;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					}
					
				} else {
					//ячейка ниже соседа тоже ранена
					//3 раненых вряд, 4хпалубник, снова проверяем
					
					if (k == 7) {
						//проверяемая ячейка в третьем снизу ряду
						//ниже соседа граница
						
						//стреляем выше раненой
						i = n - 10;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					} else if (playerPlayingField.childNodes[n + 30].innerHTML == "\u25CF") {
						//ячейка ниже соседей отмечена мимо
						
						//стреляем dsit раненой
						i = n - 10;
						
						//стреляю
						shootsToDownDirectionShip(i, n);
						
					} else {
						//ячейка ниже соседей свободна
						//проверяю, что ячейка выше раненой тоже
						//и не за границей
						//рандомно стреляю
						
						if (k != 1) {
							
							if (playerPlayingField.childNodes[n - 10].innerHTML != "\u25CF") {
								
								let sellsForShot = [n - 10, n + 30];
								
								//определяю
								i = sellsForShot[getRandomNumber(0, 1)];
								
								//стреляю
								shootsToDownDirectionShip(i, n);
								
							} else {
								
								i = n + 30;
								
								//стреляю
								shootsToDownDirectionShip(i, n);
								
							}
							
						} else {
							
							i = n + 30;
							
							//стреляю
							shootsToDownDirectionShip(i, n);
							
						}
						
					}
					
				}
				
			}
			
			check = 1;
			
			break outer;
			
		} else {
			//если нет раненых вокруг чек 0
			check = 0;
		}
		
	}
	
	//если нет раненых стреляю в рандомную свободную ячейку
	//вокруг раненой
	if (!check) {
		
		i = aroundSells[getRandomNumber(0, (aroundSells.length - 1))];
		
		let pointer = n - i;
		
		if (pointer == 10 || pointer == -10) {
			shootsToDownDirectionShip(i, n);
		} else if (pointer == 1 || pointer == -1) {
			shootsToRightDirectionShip(i, n);
		}
		
	}
	
}


//стреляю в раненый корабль с направлением вниз
function shootsToDownDirectionShip(i, n) {
	
	//вытаскиваем свойство корабля
	let ship = checkSellInPlayerShips(i);
	
	if (ship) {
	
		//глушу ячейки на поле компа
		unsubscribeCompSells();
		
		//массив живых чеек корабля
		let shiplifeSells = ship.lifeSells;
		
		//параметры корабля
		let a = ship.deck;
		let b = ship.headSell;
		
		//удяляю цель из живых ячеек
		shiplifeSells.splice(shiplifeSells.indexOf(i), 1);
		
		if (shiplifeSells.length) {
			
			//крашу ячейку корабля раненой
			playerPlayingField.childNodes[i].classList = "woundedSell";
			
			//ставлю крестик в ячейке
			playerPlayingField.childNodes[i].innerHTML = "\u274C";
			
			//удаляю из массива свободных ячеек
			playerSells.splice(playerSells.indexOf(i), 1);
			
			//пишу в инфо, что ранен
			playerInfoBlock.innerHTML = "Ранен! Прицеливаюсь.";
			
			setTimeout(subscribeCompSells, 3000);
			setTimeout(compShootsToNeighbors, 3000, i);
			
		} else {
			
			//ставлю крестик в ячейке
			playerPlayingField.childNodes[i].innerHTML = "\u274C";
			
			//крашу все ячейки корабля убитыми
			for (let key of ship.sells) {
				playerPlayingField.childNodes[key].classList = "killedSell";
			}
			
			//массив ячеек вокруг корабля
			let missSellsDown = getSellsRedZoneShipDown(a, b);
			
			//помечаю их как промазанные
			putMissAroundKilledPlayerShip(...missSellsDown);
			
			//убираю их из массива свободных ячеек
			for (let key of missSellsDown) {
				playerSells = deleteNumberFromArr(key, ...playerSells);
			}
			
			//удаляю убитый корабль из флота
			spliceShipOutPlayerFleet(b);
			
			//проверяю размер флота,
			//если 0 то заканчиваю игру, поле компа больше не кликабельно
			if (playerFleet.length) {
				
				//пишу инфо, что убит
				playerInfoBlock.innerHTML = "Убит! Прицеливаюсь.";
				
				//удаляю из массива свободных ячеек
				playerSells.splice(playerSells.indexOf(i), 1);
				
				//"обнуляю" значение раненой клетки
				woundedSellId = -1;
				
				//с задержкой в 5с подписываю свободные ячейки поля компа на клики 
				setTimeout(subscribeCompSells, 3000);
				
				//через 5с снова стреляю,
				//чтоб было время посмотреть на убитый корабль 
				setTimeout(compShoots, 3000);
				
			} else {
				
				//пишу инфо, что убит последний корабль
				playerInfoBlock.innerHTML = "Убит! Флот уничтожен. Ты проиграл!"
				
				restartButtonBlock.style.display = "block";
			}
			
		}
		
	} else {
		
		//ставлю точку мимо
		playerPlayingField.childNodes[i].innerHTML = "\u25CF";
		
		//удаляю из массива свободных ячеек
		playerSells.splice(playerSells.indexOf(i), 1);
		
		//пишу в инфо
		playerInfoBlock.innerHTML = "Мимо! Всё ок)";
		
		restartButtonBlock.style.display = "block";
		
		//сохраняю значение раненой клетки
		woundedSellId = n;
		
	}
	
}


//стреляю в раненый корабль с направлением вправо
function shootsToRightDirectionShip(i, n) {
	
	//вытаскиваем свойство корабля
	let ship = checkSellInPlayerShips(i);
	
	if (ship) {
	
		//глушу ячейки на поле компа
		unsubscribeCompSells();
		
		//массив живых чеек корабля
		let shiplifeSells = ship.lifeSells;
		
		//параметры корабля
		let a = ship.deck;
		let b = ship.headSell;
	
		//удяляю цель из живых ячеек
		shiplifeSells.splice(shiplifeSells.indexOf(i), 1);
		
		if (shiplifeSells.length) {
			
			//крашу ячейку корабля раненой
			playerPlayingField.childNodes[i].classList = "woundedSell";

			//ставлю крестик в ячейке
			playerPlayingField.childNodes[i].innerHTML = "\u274C";
			
			//удаляю из массива свободных ячеек
			playerSells.splice(playerSells.indexOf(i), 1);
			
			//пишу в инфо, что ранен
			playerInfoBlock.innerHTML = "Ранен! Прицеливаюсь.";
			
			setTimeout(subscribeCompSells, 3000);
			setTimeout(compShootsToNeighbors, 3000, i);
			
		} else {
			
			//ставлю крестик в ячейке
			playerPlayingField.childNodes[i].innerHTML = "\u274C";
			
			//крашу все ячейки корабля убитыми
			for (let key of ship.sells) {
				playerPlayingField.childNodes[key].classList = "killedSell";
			}
			
			//массив ячеек вокруг корабля
			let missSellsRight = getSellsRedZoneShipRight(a, b);
			
			//помечаю их как промазанные
			putMissAroundKilledPlayerShip(...missSellsRight);
			
			//убираю их из массива свободных ячеек
			for (let key of missSellsRight) {
				playerSells = deleteNumberFromArr(key, ...playerSells);
			}
			
			//удаляю убитый корабль из флота
			spliceShipOutPlayerFleet(b);
			
			//проверяю размер флота,
			//если 0 то заканчиваю игру, поле компа больше не кликабельно
			if (playerFleet.length) {
				
				playerInfoBlock.innerHTML = "Убит! Прицеливаюсь.";
				
				//удаляю из массива свободных ячеек
				playerSells.splice(playerSells.indexOf(i), 1);
				
				//"обнуляю" значение раненой клетки
				woundedSellId = -1;
				
				//с задержкой в 5с подписываю свободные ячейки поля компа на клики 
				setTimeout(subscribeCompSells, 3000);
				
				//через 5с снова стреляю,
				//чтоб было время посмотреть на убитый корабль 
				setTimeout(compShoots, 3000);
				
			} else {
				playerInfoBlock.innerHTML = "Убит! Флот уничтожен. Ты проиграл!"
				
				restartButtonBlock.style.display = "block";
			}
			
		}
		
	} else {
		
		//ставлю точку мимо
		playerPlayingField.childNodes[i].innerHTML = "\u25CF";
		
		//удаляю из массива свободных ячеек
		playerSells.splice(playerSells.indexOf(i), 1);
		
		//пишу в инфо
		playerInfoBlock.innerHTML = "Мимо! Всё ок)";
		
		restartButtonBlock.style.display = "block";
		
		woundedSellId = n;
		
	}
	
}


//отписываю непрострелянные ячейки компа на событие по клику
function unsubscribeCompSells() {
	
	for (let key of compSells) {
		compPlayingField.childNodes[key].removeEventListener("click", checkCompSell);
	}
	
}


//подписываю непрострелянные ячейки компа на событие по клику
function subscribeCompSells() {
	
	for (let key of compSells) {
		compPlayingField.childNodes[key].addEventListener("click", checkCompSell);
	}
	
}



//проверяю есть ли ячейка в кораблях игрока
function checkSellInPlayerShips(i) {
	
	//для каждого корабля проверяю налиие ячейки в массиве живых ячеек
	outer: for (let j = 0; j < playerFleet.length; j++) {
		
		let shipSells = playerFleet[j].sells;
		
		//проверяю наличие ячейки в массиве ячеек
		//при соответствии корабль со свойствами,
		//если нет, то возвращаю false
		for (let n = 0; n < shipSells.length; n++) {
			
			if (shipSells[n] == i) {
				return playerFleet[j];
				
				//прерываю цикл по ячейкам корабля
				break;
				
				//прерываю цикл по массиву флота
				break outer;
			} 
			
		}
		
	}
	
	return false;
	
}