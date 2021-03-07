# nest.js
back-end 를 위한 node.js 의 express 모듈 기반의 framework
- [🇨🇴👓 nest.js?](https://www.youtube.com/watch?v=SHfR1tLpe1o&t=28s)
- 학습 링크: [🇨🇴👓 니콜라스 입니다~](https://nomadcoders.co/nestjs-fundamentals)

## 1 install
```shell
$ npm i -g @nestjs/cli
$ nest new project-name
(npm 선택)
```
프로젝트 생성 시 ```Failed to execute command: npm install --silent``` 가 발생할 경우 ***관리자 권한*** 으로 수행해 보세요.
```shell
$ sudo nest new project-name
```
## 2 run
```shell
$ npm install
$ npm start
```
## 3 command
controller 생성
```shell
$ nest g co
(controller name)
```
service 생성
```shell
$ nest g s
(service name)
```
## 4 database
https://docs.nestjs.com/techniques/database

```shell
$ npm install --save @nestjs/typeorm typeorm mysql2
```

# Insomnia.rest
REST Client. End Point Test Tool.
## 1 install
- https://insomnia.rest/
- Insomnia Core 다운로드

# test
- [jest](https://jestjs.io/): npm package for javascript test
- .spec.tx 파일은 test 를 포함한 파일 임
## unit test
function 단위 test
## e2e test
사용자 관점에서 test