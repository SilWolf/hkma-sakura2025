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
    <div className="container mx-auto text-center">
      <div className="fixed top-0 left-0 right-0 z-50 text-right md:hidden">
        <button className="p-2" onClick={handleClickMenu}>
          <i className="bi bi-list text-4xl"></i>
        </button>
      </div>
      <ul
        className="bg-gray-900 fixed top-0 left-0 right-0 z-40 hidden pt-12 md:pt-0 md:block md:static md:bg-transparent md:[&>li]:inline-block [&>li>a]:block md:[&>li>a]:inline-block [&>li>a]:py-4 [&>li>a]:px-4"
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
          <Link onClick={handleCloseMenu} href="/teams">
            隊伍
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/">
            聯賽賽制及規則
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/">
            賽程
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/statistics">
            排名及數據
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/#old-matches">
            過往對局
          </Link>
        </li>
        <li>
          <Link onClick={handleCloseMenu} href="/#new-players">
            新手專區
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
