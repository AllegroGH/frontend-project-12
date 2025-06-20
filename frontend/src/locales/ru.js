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
    },

    validation: {
      requiredField: 'Обязательное поле',

      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      mustBeUnique: 'Должно быть уникальным',
      mustBeCleanUnique: 'Должно быть уникальным ;)',

      confirmPassword: 'Подтвердите пароль',
      passwordsMustMatch: 'Пароли должны совпадать',
    },

    chatServer: {
      authError: 'Ошибка авторизации',
      incorrectUserOrPass: 'Неверные имя пользователя или пароль',

      signupError: 'Ошибка регистрации',
      userExists: 'Такой пользователь уже существует',

      loadingData: 'Загрузка...',
      loadingDataError: "Ошибка загрузки данных\n\n(попробуйте обновить страницу)",

      channelAdded: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',

      loadingChannelsError: `Ошибка загрузки каналов`,
      addOrRenameChannelError: 'Ошибка добавления или изменения канала',
      addChannelError: `Ошибка добавления канала`,
      renameChannelError: `Ошибка переименования канала`,      
      removeChannelError: 'Ошибка удаления канала',

      loadingMessagesError: `Ошибка загрузки сообщений`,
      addMessageError: `Ошибка добавления сообщения`,
      removeMessageError: `Ошибка удаления сообщения`,

      serverUnavailable: 'Сервер недоступен',

      netIsDown: 'Отсутствует интернет-соединение',
      netIsUp: 'Соединение восстановлено',
    },
  }
};

// [а-яА-ЯёЁ]

export default ru;