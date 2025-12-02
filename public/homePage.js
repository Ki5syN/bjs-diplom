"use strict"
let logout = new LogoutButton();

logout.action = () => ApiConnector.logout((response) => {
	if (response.success) {
		location.reload()
	}
})

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
	}
})

let ratesBoard = new RatesBoard();

function getTable() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}

getTable();

setInterval(getTable, 59999);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
		moneyManager.setMessage(true, "Деньги зачислены")
	} else {
		moneyManager.setMessage(false, response.error);
	}
})

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
		moneyManager.setMessage(true, "Конвертация прошла успешно")
	} else {
		moneyManager.setMessage(false, response.error);
	}
})

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data)
		moneyManager.setMessage(true, "Перевод выполнен")
	} else {
		moneyManager.setMessage(false, response.error);
	}
})

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(true, "Добавлен в избранное")
	} else {
		favoritesWidget.setMessage(false, response.error);
	}

})

favoritesWidget.removeUserCallback = (id) => ApiConnector.removeUserFromFavorites(id, (response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
		favoritesWidget.setMessage(true, "Пользователь удален")
	} else {
		favoritesWidget.setMessage(false, response.error);
	}
})