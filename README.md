# Messenger App

[Дизайн в Figma](https://www.figma.com/file/n8RMYyQDwcon4JUf3bXWF2/Chat-praktikum?type=design&node-id=1-612&mode=design&t=gotxnkv47qI1m8E0-0)

Проект доступен на Netlify по ссылке: https://eloquent-arithmetic-ee6077.netlify.app/

Навигация по проекту осуществляется по ссылкам на главной странице. После того как вы перешли с главной страницы на любую другую страницу, для того чтобы снова вернуться на главную, просто обновите текущую страницу в браузере.

#### Стэк:

- Handlebars
- Vite
- TypeScript
- Express

### Установка и запуск

Для запуска проекта потребуется версия **Node.JS как минимум 18.7.0**

Чтобы запустить проект, выполните следующие команды:

```
git clone git@github.com:eprikhodko/middle.messenger.praktikum.yandex.git
cd middle.messenger.praktikum.yandex
npm install
```

Запуск dev сервера:
`npm run dev`

В этом случае проект будет доступен по адресу `http://localhost:3000/`

Сборка production билда:
`npm run build`

Чтобы проверить собранный билд локально, выполните команду:
`npm run start`

Проект будет запущен при помощи express и доступен по адресу
`http://localhost:3000/`

Линтинг осуществляется при помощи команды:
`npm run lint`
При этом будет запущен eslint, тайпчекинг, а так же stylelint.
