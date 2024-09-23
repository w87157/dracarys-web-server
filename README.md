## Docker install mysql

 ### Pull Image

```bash
docker pull mysql:8.0
```

 ### Check config

```bash
docker run --rm mysql:8.0 mysql --help | grep my.cnf
```

***

### Windows

```bash
mkdir D:\docker\mysql\conf
mkdir D:\docker\mysql\data
```

copy config to local：

> Windows D:\docker\mysql

```bash
set LOCAL_DOCKER_MYSQL_PATH=D:\docker\mysql\conf
docker run -d mysql:8.0 > temp_container_id.txt
set /p DOCKER_MYSQL_TMP=<temp_container_id.txt
docker cp %DOCKER_MYSQL_TMP%:/etc/my.cnf %LOCAL_DOCKER_MYSQL_PATH%\conf
docker stop %DOCKER_MYSQL_TMP%
docker rm %DOCKER_MYSQL_TMP%
del temp_container_id.txt
```

### run container

```bash
set LOCAL_DOCKER_MYSQL_PATH=D:\docker\mysql
docker run -d ^
-p 3306:3306 ^
--name dracarys_mysql ^
-e MYSQL_ROOT_PASSWORD=root ^
-v %LOCAL_DOCKER_MYSQL_PATH%\conf\my.cnf:/etc/my.cnf ^
-v %LOCAL_DOCKER_MYSQL_PATH%\data:/var/lib/mysql/ ^
mysql:8.0
```

***

### Mac

copy config to local：

> MacOS /Users/docker/mysql

```bash
LOCAL_DOCKER_MYSQL_PATH=/Users/docker/mysql \
DOCKER_MYSQL_TMP=`docker run -d mysql:8.0` \
&& docker cp $DOCKER_MYSQL_TMP:/etc/my.cnf $LOCAL_DOCKER_MYSQL_PATH/conf \
&& docker stop $DOCKER_MYSQL_TMP \
&& docker rm $DOCKER_MYSQL_TMP
```

 ### Run container

```bash
LOCAL_DOCKER_MYSQL_PATH=/Users/docker/mysql \
&& docker run -d \
-p 3306:3306 \
--name dracarys_mysql \
-e MYSQL_ROOT_PASSWORD=root \
-v $LOCAL_DOCKER_MYSQL_PATH/conf/my.cnf:/etc/my.cnf \
-v $LOCAL_DOCKER_MYSQL_PATH/data:/var/lib/mysql/ \
mysql:8.0
```


***

## Docker install redis

### Pull Image

```bash
docker pull redis:7.0
```

> copy config to local：

> MacOS /Users/docker/redis/ 

> https://raw.githubusercontent.com/redis/redis/7.0/redis.conf

### run container

```bash

LOCAL_DOCKER_RESIS_PATH=/Users/docker/redis \
&& docker run -d \
-p 6379:6379 \
--name dracarys-redis \
-v $LOCAL_DOCKER_RESIS_PATH/data:/data \
-v $LOCAL_DOCKER_RESIS_PATH/conf/redis.conf:/etc/redis/redis.conf \
-v $LOCAL_DOCKER_RESIS_PATH/conf/users.acl:/etc/redis/users.acl \
redis:7.0 redis-server /etc/redis/redis.conf
```

***

## Docker install SRS

### Pull Image

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5.0.200
```

> copy config to local：


> MacOS /Users/docker/srs/ 

```bash
LOCAL_DOCKER_SRS_PATH=/Users/docker/srs \
DOCKER_SRS_TMP=`docker run -d registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5.0.200` \
&& docker cp $DOCKER_SRS_TMP:/usr/local/srs/conf $LOCAL_DOCKER_SRS_PATH \
&& docker cp $DOCKER_SRS_TMP:/usr/local/srs/objs $LOCAL_DOCKER_SRS_PATH \
&& docker stop $DOCKER_SRS_TMP \
&& docker rm $DOCKER_SRS_TMP
```

 ### Run container

```bash
LOCAL_DOCKER_SRS_PATH=/Users/docker/srs \
&& docker run -d --rm \
--name dracarys-srs \
--env CANDIDATE=$(ifconfig en0 inet | grep 'inet ' | awk '{print $2}') \
-p 1935:1935 \
-p 5001:8080 \
-p 1985:1985 \
-p 8000:8000/udp \
-v $LOCAL_DOCKER_SRS_PATH/conf:/usr/local/srs/conf/ \
-v $LOCAL_DOCKER_SRS_PATH/objs:/usr/local/srs/objs/ \
registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5.0.200 objs/srs \
-c conf/rtc2rtmp.conf
```
