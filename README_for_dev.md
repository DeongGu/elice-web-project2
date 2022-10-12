# DB & 백엔드 로컬 환경 구축

<br>

## 1. Docker 설치

- https://www.docker.com \
  운영체제에 맞는 docker 다운로드 및 설치

- 터미널(cmd 등)에서 정상 설치 확인

```
$ docker -v
Docker version 20.10.17, build 100c701
```

<br>

## 2. GitLab 'back' branch pull

(작업 중인 파일 있는 경우 덮어써지지 않도록 주의!)

```
$ git clone https://kdt-gitlab.elice.io/ai_track/class05/data_project/team12.git
$ git pull back
...
```

<br>

## 3. git 기본경로 \_db 및 back 폴더 생성 확인

```
$ ls -la
$ dir
```

<br>

## 4. Docker 실행

```
$ cd _db
$ yarn db
```

위 명령어 실행 시 아래 사항이 자동 실행됨

- ( docker-compose up -d )
- MySQL, Networt, DB Admin Docker image 다운로드
- 위 image로 Docker Container 자동 생성 및 백그라운드 실행
- MySQL DB shop 데이터베이스 생성

<br>

## 5. Docker 실행 확인

- ![01](/_doc/img/01.png)

- ![02](/_doc/img/02.png)

<br>

## 6. 백엔드 라이브러리 설치

- node.js가 설치되어 있지 않으면 먼저 설치한다.
- yarn 은 최초 1회만 하면 된다.

```
$ yarn
```

<br>

## 7. 벡엔드 환경 파일 작성

- /back/src/ 경로에 `.env` 파일을 작성한다.
- 내용은 아래와 같다. \
  (복붙하세요~~)

```
PORT=5000
DB_DIALECT=mysql
MYSQL_USERNAME= root
MYSQL_PASSWORD= pwteam12
MYSQL_DATABASE= shop
MYSQL_HOST=localhost
MYSQL_PORT=3306
JWT_SECRET_KEY=6ASFASDADASQWXCZX
SEQUELIZE_LOGGING=false
```

<br>

## 8. 백엔드 실행

현재 경로가 ./back 인지 확인한 후

```
$ yarn start
```

<br>

## 9. 백엔드 서버 실행 확인

```
테이블 생성 로그.....


데이터베이스 연결 성공
서버 가동 ON PORT:  5000

```

<br>

## 10. 접속 및 API 동작을 테스트를 해본다.

- URL \
  http://localhost:5000/api/users
- Postman API Doc \
  https://www.postman.com/tlabtlab/workspace/team12/collection/17580924-3eba8753-7078-456e-abb0-ac5c8d3dea26?action=share&creator=17580924

<br>

## 11. DB는 아래와 같이 확인 가능하다.

- http://localhost:8080

```
- 데이터베이스 형식: MySQL
- 서버: mysqldb
- 사용자이름: root
- 비밀번호: pwteam12
- 데이터베이스: shop
```

- ![03](/_doc/img/03.png)
- ![04](/_doc/img/04.png)
