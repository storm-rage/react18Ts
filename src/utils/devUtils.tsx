import { iconList } from "@/common/MenuIconMap";

// 用于处理menus 菜单数组 删除空数组 children 删除不是页面路由 pagepermisson 删除rightId
export const handleSideMenu = (menus: any, rights: any, find: any = []) => {
  for (const menu of menus) {
    let index = rights.findIndex((item: any) => item === menu.key) + 1;
    if (menu.children) {
      if (!menu.children.length || !index) {
        delete menu.children;
      } else {
        menu.children = handleSideMenu([...menu.children], rights, []);
      }
    }
    if (menu.rightId) {
      delete menu.rightId;
    }
    if (index) {
      find.push(menu);
    }
  }
  return find;
};

// 映射菜单图标数组 本地无法存储react节点 所以需要再取值是进行映射
export const mapIconMenus = (menus: any, find: any = []) => {
  for (const menu of menus) {
    if (menu.children?.length) {
      menu.children = mapIconMenus(menu.children, []);
    }
    if (menu.children?.length === 0) {
      delete menu.children;
    }
    if (iconList[menu.key]) {
      menu.icon = iconList[menu.key];
    }
    if (menu.pagepermisson) {
      find.push(menu);
    }
  }
  return find;
};

function isObj(obj: any) {
  const str = typeof obj;
  return str === "object" || (str === "function" && obj !== null);
}

// 深拷贝
export function deepCopy(obj: any, wekmap = new WeakMap()) {
  // symbol作为值直接返回一个新的symbol
  if (typeof obj === "symbol") return Symbol(obj.description);
  if (typeof obj === "function") return obj;
  if (!isObj(obj)) return obj;
  // 循环引用
  if (wekmap.has(obj)) return wekmap.get(obj);
  const newObj: any = Array.isArray(obj) ? [] : {};
  wekmap.set(obj, newObj);
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key], wekmap);
  }
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  // symbol的值作为key
  for (const val of symbolKeys) {
    newObj[val] = deepCopy(obj[val], wekmap);
  }
  return newObj;
}
