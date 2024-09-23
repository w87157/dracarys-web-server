
import { chalkINFO } from '@/utils/chalkTip';

console.log(chalkINFO('初始化了relation'));
/**
 * https://demopark.github.io/sequelize-docs-Zh-CN/core-concepts/assocs.html
 * A 稱為 源 模型,而 B 稱為 目標 模型.
 * A.hasOne(B) 關聯意味著 A 和 B 之間存在一對一的關係,外鍵在目標模型(B)中定義.
 * A.belongsTo(B)關聯意味著 A 和 B 之間存在一對一的關係,外鍵在源模型中定義(A).
 * A.hasMany(B) 關聯意味著 A 和 B 之間存在一對多關係,外鍵在目標模型(B)中定義.
 * A.belongsToMany(B, { through: 'C' }) 關聯意味著將表 C 用作聯結表,在 A 和 B 之間存在多對多關係. 具有外鍵(例如,aId 和 bId). Sequelize 將自動創建此模型 C(除非已經存在),並在其上定義適目的外鍵.
 * Foo.belongsToMany(Bar, { through: 'foo_bar', sourceKey: 'name', targetKey: 'title' }); 這將創建帶有字段 `fooName` 和 `barTitle` 的聯結表 `foo_bar`.
 * A.belongsToMany(B) 包含一個額外的表(聯結表),因此 sourceKey 和 targetKey 均可用,其中 sourceKey 對應於A(源)中的某個字段而 targetKey 對應於 B(目標)中的某個字段.
 * belongsToMany中，foreignKey 定義聯結關係中源模型的 key,而 otherKey 定義目標模型中的 key
 */

/**
 * A 稱為 源 模型,而 B 稱為 目標 模型.
 * sourceKey:用作源表中關聯鍵的字段的名稱。默認為源表的主鍵
 * targetKey:要用作目標表中關聯鍵的字段的名稱。默認為目標表的主鍵
 * otherKey:聯接表中外鍵的名稱（表示目標模型）或表示另一列類型定義的對象的名稱（有關語法，
 * 請參見“Sequelize.define”）。使用對象時，可以增加“name”屬性來設置列的名稱。默認為目標的名稱+目標的主鍵
 * foreignKey:目標表中外鍵的名稱，或表示外部列類型定義的對象的名稱（有關語法，
 * 請參見'Sequelize.define'。使用對象時，可以增加“name”屬性來設置列的名稱。默認為源的名稱+源的主鍵
 */

// Auth.belongsTo(Auth, {
//   foreignKey: 'id',
//   targetKey: 'p_id',
//   onDelete: 'CASCADE',
//   hooks: true,
//   constraints: false,
// });

// Auth.hasMany(Auth, {
//   foreignKey: 'p_id',
//   sourceKey: 'id',
//   as: 'auth_children',
//   onDelete: 'CASCADE',
//   hooks: true,
//   constraints: false,
// });

// User.hasMany(Star, {
//   foreignKey: 'to_user_id',
//   sourceKey: 'id',
//   constraints: false,
// });


// =================

// 流量統計
// DayData.belongsTo(VisitorLog, { foreignKey: 'today' });
// DayData.hasMany(VisitorLog, { foreignKey: 'today', sourceKey: 'createdAt' });
// VisitorLog.belongsTo(DayData, {
//   foreignKey: 'createdAt',
//   // targetKey: 'today',
// });
// Article有很多Comment,也就是Article是主鍵表,Comment是外鍵表。外鍵在Comment表裡,主鍵在Article裡
// DayData.hasMany(VisitorLog, { foreignKey: 'today', sourceKey: 'createdAt' });
// Comment屬於Article,也就是Article是主鍵表,Comment是外鍵表。外鍵在Comment表裡,主鍵在Article表裡
// VisitorLog.belongsTo(DayData, {
//   foreignKey: 'createdAt',
//   sourceKey: 'today',
//   // targetKey: 'createdAt',
// });
// DayData.hasMany(VisitorLog, {
//   foreignKey: 'today1',
//   sourceKey: 'today',
//   // targetKey: 'createdAt',
//   constraints: false,
// });
