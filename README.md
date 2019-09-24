### Специфический babel.plugin для добавления имени компонента к вызову фабрики компонента

Фабрика имеет вид:

```js
Components.build({
    create() {

    },
    ...
})
```

Матчимся на это знание и добавляем также информацию о компоненте:

```js
Components.build({
    create() {

    },
    componentName: 'bla-bla',
    ...
})
```

#### Установка

```
yarn add --dev @hh.ru/babel-plugin-insert-pathname
```

Добавить `@hh.ru/babel-plugin-insert-pathname` в `.babelrc` файл:

```json
{
    "plugins": ["@hh.ru/babel-plugin-insert-pathname"]
}
```
