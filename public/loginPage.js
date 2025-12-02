"use strict"
let user = new UserForm();

user.loginFormCallback = (data) => ApiConnector.login(data, (response) => {
	console.log(response);
	if (response.success) {
		location.reload();
	} else {
		user.setLoginErrorMessage(response.error);
	}
})

user.registerFormCallback = (data) => ApiConnector.register(data, (response) => {
	console.log(response);
	if (!response.success) {
		location.reload();
	} else {
		user.setRegisterErrorMessage(response.error);
	}
})