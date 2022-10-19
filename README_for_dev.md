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

## 4-1. 벡엔드 환경 파일 작성

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
NODE_ENV=development
AWS_SDK_LOAD_CONFIG=true
AWS_KEY=AKIAYWK4DYI5LY2ZCZRS
AWS_SECRET_KEY=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
BURKET=team12-s3
REGION=ap-northeast-2
```

<br>

## 4-2. AWS S3(파일 서버) 벡엔드 환경 파일 작성

- 이미지 업로드(aws) 기능 추가로 인해 설정 파일(2개)을 \
  아래 경로에 넣어둬야 백엔드 로컬 서버 기동이 가능

- Linux, Unix 및 macOS의 공유 자격 증명 파일 위치: `~/.aws/` \
  Windows의 공유 자격 증명 파일: `C:\Users\사용자이름\.aws\`

- 파일명: credentials, config (각 1개씩 동일 내용으로 작성, 확장자 없음)

```
[default]
aws_access_key_id = AKIAYWK4DYI5LY2ZCZRS
aws_secret_access_key = 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
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

## (참고) DB를 초기화하고 싶다면

- docker 컨테이너 삭제
  <br><br>
  ![08](/_doc/img/08.png)

- `_db\mysql\data` 폴더 삭제 후

- 6번부터 다시 실행

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

## 11. DB 를 확인한다.

- DBeaver 툴 사용
  https://dbeaver.io <br><br>
  ![07](/_doc/img/07.png)

## 12. 간단한 DB 확인은 관리자 화면에서 가능하다.

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

## 13. 포스트맨 테스트 방법

1. Local에서 테스트할지 VM에서 테스트할지 정하고, 해당 콜랙션으로 들어간다.

2. User API 에서 회원가입을 한다.

3. 로그인을 하고 응답 body 값을 확인한다.
   { userId : ....,
   "Authentication": "긴 JWT 코드" }

4. jwt 코드를 콜랙션(ex. Local)에 Authentication 에 붙여넣는다. <br><br>
   ![05](/_doc/img/05.png)

5. userId 값을 콜랙션(ex. Local)에 Varables 의 userId의 VALUE 에 붙여넣는다. <br><br>
   ![06](/_doc/img/06.png)

6. 이제 테스트를 진행한다.

<br>
