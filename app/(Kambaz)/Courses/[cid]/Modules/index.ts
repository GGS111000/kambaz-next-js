// 单一入口，防止不同 import 字符串造成多个实例
export { default as modulesReducer } from "./reducer";
export {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  type Module,
} from "./reducer";
