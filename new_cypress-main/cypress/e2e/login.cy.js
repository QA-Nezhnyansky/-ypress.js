describe('Проверка авторизации', function () {

    it('Валидный логин и пароль', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#mail').type('german@dolnikov.ru'); // Валидный логин
         cy.get('#pass').type('iLoveqastudio1'); // Валидный пароль
         cy.get('#loginButton').click(); // Нажать на кнопку войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Вижу текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
     })
     it('Восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').click(); // Нажали на кнопку "Забыли пароль"
        cy.get('#forgotForm > .header').contains('Восстановите пароль'); // Вижу текст
        cy.get('#mailForgot').type('german@dolnikov.ru'); // Ввели логин
        cy.get('#restoreEmailButton').click(); // Нажали отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
    })
    it('Негативный кейс авторизации "Не верный пароль"', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Валидный логин
        cy.get('#pass').type('dsveverb324'); // Невалидный пароль
        cy.get('#loginButton').click(); // Нажать на кнопку войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
    })
    it('Негативный кейс авторизации "Не верный логин"', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('yury.nezh@mail.ru'); // Невалидный логин
        cy.get('#pass').type('iLoveqastudio1'); // Валидный пароль
        cy.get('#loginButton').click(); // Нажать на кнопку войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
    })
    it('Негативный кейс валидации', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('germandolnikov.ru'); // Нет "@"
        cy.get('#pass').type('iLoveqastudio1'); // Валидный пароль
        cy.get('#loginButton').click(); // Нажать на кнопку войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
    })
    it('Приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Строчные буквы
        cy.get('#pass').type('iLoveqastudio1'); // Валидный пароль
        cy.get('#loginButton').click(); // Нажать на кнопку войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Пользователю виден крестик
    })
 }) 
 describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');  // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type('USER_LOGIN');  // вводим логин
         cy.get('input[type="password"]').type('USER_PASSWORD'); // вводим пароль
         cy.get('button[type="submit"]').click();  // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"]').click(); // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');  // вводим номер карты
         cy.get('.k_input_ccv').type('125');  // вводим CVV карты
         cy.get('.k_input_date').type('1225');  // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');  // вводим имя владельца действия карты
         cy.get('.pay-btn').click(); // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456'); // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click(); // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем наличие и видимость сообщения о успешной покупке
     });
 });
