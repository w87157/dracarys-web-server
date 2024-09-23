// TODO 別名路徑 
import path from 'path';

import moduleAlias from 'module-alias';
import { chalkSUCCESS } from '../utils/chalkTip';
import { PROJECT_NODE_ENV } from '../constant';

if (PROJECT_NODE_ENV === 'development') {
  moduleAlias.addAlias('@', path.join(process.cwd(), 'src'));
} else {
  // moduleAlias.addAlias('@', path.join(process.cwd(), 'dist'));
}

export const aliasOk = () => {
  console.log(chalkSUCCESS('增加路徑名稱成功！'));
};
