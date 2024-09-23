import kleur from 'kleur';
import nodeEmoji from 'node-emoji';

const emoji = nodeEmoji;
const chalk = kleur;

const chalkINFO = (v) => 
  `${chalk.bgBlue().black(' INFO ')} ${chalk.blue(v)}`;
const chalkSUCCESS = (v) => 
  `${chalk.bgGreen().black(' SUCCESS ')} ${chalk.green(v)}`;
const chalkERROR = (v) => 
  `${chalk.bgRed().black(' ERROR ')} ${chalk.red(v)}`;
const chalkWARN = (v) => 
  `${chalk.bgYellow().black(' WARN ')} ${chalk.yellow(v)}`;

export {
  emoji,
  chalk,
  chalkINFO,
  chalkSUCCESS,
  chalkERROR,
  chalkWARN,
};
