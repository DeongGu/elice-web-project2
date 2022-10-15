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

## 2. GitLab clone

(작업 중인 파일 있는 경우 덮어써지지 않도록 주의!)

```
$ git clone https://kdt-gitlab.elice.io/ai_track/class05/data_project/team12.git
$ cd team12
$ git checkout -t origin/back
Switched to a new branch 'back'
branch 'back' set up to track 'origin/back'.
```

<br>

## 3. \_db 및 back 폴더 생성 확인

```
$ ls -la 또는 dir

total 24
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 ./
drwxr-xr-x 1 wisht 197609    0 10월 12 18:54 ../
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 .git/
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 .vscode/
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 _db/
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 _doc/
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 back/
drwxr-xr-x 1 wisht 197609    0 10월 12 18:57 front/
-rw-r--r-- 1 wisht 197609 6029 10월 12 18:52 README.md
-rw-r--r-- 1 wisht 197609 2412 10월 12 18:57 README_for_dev.md

```

<br>

## 4. 벡엔드 환경 파일 작성

- ./back 경로에 `.env` 파일을 작성한다.
- 내용은 아래와 같다. \
  (복붙하세요~~)

```
PORT=5000
DB_DIALECT=mysql
MYSQL_USERNAME= team12
MYSQL_PASSWORD= pwteam12
MYSQL_DATABASE= shop
MYSQL_HOST=localhost
MYSQL_PORT=3306
JWT_SECRET_KEY=6ASFASDADASQWXCZX
SEQUELIZE_LOGGING=false
```

<br>

## 5. 백엔드 라이브러리 설치

- node.js가 설치되어 있지 않으면 먼저 설치한다.

```
$ cd back
$ npm install --global yarn
$ yarn
```

<br>

## 6. Docker 에서 MySQL DB 실행

```
$ yarn db
```

위 명령어 실행 시 아래 사항이 자동 실행됨

- ( docker-compose up -d )
- MySQL, Networt, DB Admin Docker image 다운로드
- 위 image로 Docker Container 자동 생성 및 백그라운드 실행
- MySQL DB shop 데이터베이스 생성

<br>

## 7. Docker 정상실행 확인 <br>

![01](/_doc/img/01.png)
<br><br>
![02](/_doc/img/02.png)

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

- API URL 예시\
  http://localhost:5000/api/items
- Postman API Doc \
  https://www.postman.com/tlabtlab/workspace/team12/collection/17580924-3eba8753-7078-456e-abb0-ac5c8d3dea26?action=share&creator=17580924

<br>

## 11. 간단한 DB 확인은 관리자 화면에서 가능하다.

- http://localhost:8080
- 상세한 사항은 '기타' 참고

```
- 데이터베이스 형식: MySQL
- 서버: mysqldb
- 사용자이름: root 또는 team12
- 비밀번호: pwteam12
- 데이터베이스: shop
```

![03](/_doc/img/03.png)
![04](/_doc/img/04.png)

---

<br>

# 기타

## pm2 로 yarn 실행 (windows 기준)

```
yarn pm2
```

<br>

## 포스트맨 테스트 방법

1. Local에서 테스트할지 VM에서 테스트할지 정하고, 해당 콜랙션으로 들어간다.

2. User API 에서 회원가입을 한다.

3. 로그인을 하고 응답 body 값을 확인한다.
   { "Authentication": "긴 JWT 코드"}

4. 이걸 콜랙션(ex. Local)에 Authentication 에 넣는다. <br><br>
   ![05](/_doc/img/05.png)

5. 회원 목록을 조회한다.

6. 내가 로그인한 userId 값을 복사한다.

7. 이걸 콜랙션(ex. Local)에 Varables 의 userId의 VALUE 에 넣는다. <br><br>
   ![06](/_doc/img/06.png)

8. 이제 테스트를 진행한다.

<br>

## DB 편리하게 보기

- DBeaver 툴 사용
  https://dbeaver.io <br><br>
  ![07](/_doc/img/07.png)
