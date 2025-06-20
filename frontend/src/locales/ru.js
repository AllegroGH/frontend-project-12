const ru = {
  translation: {
    p404: {
      notFound: 'Страница не найдена',

      mainPageLinkPrefix: 'Но вы можете перейти',
      mainPageLinkText: 'на главную страницу',
    },

    appHeader: {
      logoutButton: 'Выйти',
    },

    login: {
      title: 'Войти',

      usernamePlaceholder: 'Ваш ник',
      usernameLabel: 'Ваш ник',
      passwordPlaceholder: 'Пароль',
      passwordLabel: 'Пароль',
      enterButton: 'Войти',
      enterButtonInProgress: 'Вход...',

      signPageLinkPrefix: 'Нет аккаунта?',
      signPageLinkText: 'Регистрация',
    },

    signup: {
      title: 'Регистрация',

      usernamePlaceholder: 'Имя пользователя',
      usernameLabel: 'Имя пользователя',
      passwordPlaceholder: 'Пароль',
      passwordLabel: 'Пароль',
      confirmPasswordPlaceholder: 'Подтвердите пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      signupButton: 'Зарегистрироваться',
      signupButtonInProgress: 'Регистрация...',
    },

    chat: {
      general: {
        loadingData: 'Загрузка...',
        loadingDataError: 'Ошибка загрузки данных',

        messagesCount_one: '{{count}} сообщение',
        messagesCount_few: '{{count}} сообщения',
        messagesCount_many: '{{count}} сообщений',
      },

      channelList: {
        title: 'Каналы',
        itemDropdown: 'Управление каналом',
        itemDropdownRename: 'Переименовать',
        itemDropdownRemove: 'Удалить',
      },

      messageForm: {
        ariaLabel: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        sendSpan: 'Отправить',            
      },

      channelModal: {
        addTitle: 'Добавить канал',
        renameTitle: 'Переименовать канал',
        removeTitle: 'Удалить канал',
        confirmRemoveQuestion: 'Уверены?',

        cancelButton: 'Отменить',
        sendButton: 'Отправить',
        sendButtonInProgress: 'Отправка...',
        removeButton: 'Удалить',
      },

      toasts: {
        channelAdded: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
      },
    },

    validation: {
      requiredField: 'Обязательное поле',

      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      mustBeUnique: 'Должно быть уникальным',

      confirmPassword: 'Подтвердите пароль',
      passwordsMustMatch: 'Пароли должны совпадать',
    },

    chatServer: {
      incorrectUserOrPass: 'Неверные имя пользователя или пароль',
      authError: 'Ошибка авторизации:',
      userExists: 'Такой пользователь уже существует',
      signupError: 'Ошибка регистрации:',
      addOrChangeChannelError: 'Ошибка добавления или изменения канала',
      removeChannelError: 'Ошибка удаления канала',
    },
  }
};

// [а-яА-ЯёЁ]

export default ru;