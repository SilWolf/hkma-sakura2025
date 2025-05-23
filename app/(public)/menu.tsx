"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

const Menu = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const handleClickMenu = useCallback(() => {
    setMenuOpened((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpened(false);
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 text-right laptop:hidden">
        <button
          className="py-1 px-2"
          onClick={handleClickMenu}
          aria-label="選單"
        >
          <i className="bi bi-list text-4xl"></i>
        </button>
      </div>
      <ul
        className="bg-neutral-100 fixed top-0 left-0 right-0 z-40 hidden pt-12 laptop:pt-0 laptop:block laptop:static laptop:bg-transparent laptop:[&>li]:inline-block [&>li>a]:block laptop:[&>li>a]:inline-block [&>li>a]:py-4 [&>li>a]:px-4"
        style={{
          display: menuOpened ? "block" : undefined,
        }}
      >
        <li>
          <Link onClick={handleCloseMenu} href="/">
            主頁
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/schedule">
            賽程及對局紀錄
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/players">
            參賽選手
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/#ranking">
            排名及數據
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/ruling">
            聯賽賽制及規則
          </Link>
        </li>
        {/* <li>
          <Link
            href="https://docs.google.com/spreadsheets/d/12wGSDpsiHSdZ7ljRYX8Mz71JAGyN4iwrnIV1en9lRqQ/edit"
            target="_blank"
          >
            判罰記錄 <i className="text-xs bi bi-box-arrow-up-right"></i>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Menu;
