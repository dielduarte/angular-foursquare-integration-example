##Buid do app
Para gerar o app basta rodar no terminal:

```
	npm install
	bower install
	gulp
```

O processo acima gerará uma pasta chamada `build` aonde se encontra o projeto final para produção.

######OBS: ao rodar bower install caso o mesmo peça para escolher a versāo do angular, favor escolher a versāo 1.5

##Considerações importantes
Template jade,
Framework angular.js 1.5
SASS  - pre processador
BEM   - nomenclarura
gulp - task runner
bower e npm - packages managers

###gulp nocache
A task `gulp nocache` é utilizada em alguns projetos que faço aonde os mesmos tem um processo de CI (continuos integration) para burlar o cache quando novas features entram em produçāo.

A task enxerga os scripts e css importados na index da nossa spa, gera um novo arquivo renomeandos com uma hash e substitui a chamada na index, burlando qualquer tipo de cache feito pelo browser do client.

####contato
magdiel.kesller@gmail.com
(31) 99226-3265
github.com/dielduarte
