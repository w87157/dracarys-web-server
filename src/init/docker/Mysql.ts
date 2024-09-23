import { execSync } from 'child_process';

import { MYSQL_CONFIG } from '@/secret/secret';
import { chalkERROR, chalkSUCCESS, chalkWARN, emoji } from '@/utils/chalkTip';

export const dockerRunMysql = (init = true) => {
  if (!init) return;
  console.log(chalkWARN('開始啟動Mysql'));
  try {
    // stop old container
    execSync(`docker stop ${MYSQL_CONFIG.docker.container}`);
  } catch (error) {
    console.log('停掉舊的mysql容器出錯');
    // console.log(error);
  }

  // start new container
  try {
    execSync(
      `docker run -d --rm \
      -p ${MYSQL_CONFIG.docker.port[3306]}:3306 \
      --name ${MYSQL_CONFIG.docker.container} \
      -e MYSQL_ROOT_PASSWORD=${MYSQL_CONFIG.docker.MYSQL_ROOT_PASSWORD}  \
      -v ${MYSQL_CONFIG.docker.volume}/conf/my.cnf:/etc/my.cnf \
      -v ${MYSQL_CONFIG.docker.volume}/data:/var/lib/mysql/ \
      ${MYSQL_CONFIG.docker.image}`
    );
    console.log(chalkSUCCESS(`啟動Mysql成功！`));
  } catch (error) {
    console.log(chalkERROR(`啟動Mysql錯誤！`));
    console.log(error);
  }
};

