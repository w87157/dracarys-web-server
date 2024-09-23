
import { PROJECT_ENV, PROJECT_ENV_ENUM } from '../constant';

export const MYSQL_CONFIG = {
  docker: {
    container: 'dracarys-mysql',
    image: 'mysql:8.0',
    port: { 3306: 3306 },
    MYSQL_ROOT_PASSWORD:
      PROJECT_ENV === PROJECT_ENV_ENUM.development ? '*************' : '*************',
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '/Users/docker/mysql'
        : '*************',
  },
  database:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? '*************' : '*************',
  host:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? '127.0.0.1'
      : '*************',
  port: 3306,
  username: 'root',
  password:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? '*************' : '*************',
}; // Mysql配置

export const SRS_CONFIG = {
  docker: {
    // docker srs container
    container: 'dracarys-srs',
    image: 'registry.cn-hangzhou.aliyuncs.com/ossrs/srs:5.0.200',
    port: {
      1935: 1935,
      8080: 5001,
      1985: 1985,
      8000: 8000,
    },
    volume:
      PROJECT_ENV === PROJECT_ENV_ENUM.development
        ? '/Users/docker/srs'
        : '*************',
  },
  // CANDIDATE填你的本機ip地址
  CANDIDATE:
    PROJECT_ENV === PROJECT_ENV_ENUM.development
      ? `$(ifconfig en0 inet | grep 'inet ' | awk '{print $2}')` // WARN just for mac
      : '*************',
}; // SRS配置

export const SSH_CONFIG = {
  username: '**********',
  password: '**********',
  host: '**********',
  port: 666,
};


export const REDIS_CONFIG = {
  database: 666,
  socket: {
    port: 666,
    host: '**********',
  },
  password: '**********',
}; 