// eslint-disable-next-line
import './alias';
import './initFile';

import { PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import { dockerRunMysql } from '@/init/docker/Mysql';
import { dockerRunSRS } from '@/init/docker/SRS';
import { dockerIsInstalled } from '@/utils';
import { chalkERROR, chalkSUCCESS } from '@/utils/chalkTip';

const flag = dockerIsInstalled();
if (flag) {
  console.log(chalkSUCCESS('docker已安装'));
  dockerRunMysql(PROJECT_ENV !== PROJECT_ENV_ENUM.prod);
  dockerRunSRS(true);
} else {
  console.log(chalkERROR('未安装docker！'));
}