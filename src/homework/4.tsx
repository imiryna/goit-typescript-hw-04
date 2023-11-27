import React, { createContext, useMemo, useState, useContext, FC } from "react";
import noop from "lodash/noop";

// Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds

// Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu

// Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.

// Описати тип PropsProvider: Опишіть правильний тип для дітей

// Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

interface SelectedMenu {
  id: MenuIds;
}
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// Додати тип Menu Selected

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "first" },
});

// Додайте тип MenuAction
interface MenuAction {
  onSelectedMenu(selectedMenu: SelectedMenu): void;
}

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: React.ReactNode; // Додати тип для children
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({ id: "first" });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>{children}</MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Array<Menu>; // Додайте вірний тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title} {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
