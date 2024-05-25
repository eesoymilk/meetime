import type { Component } from "solid-js";
import NavItem from "./NavItem";

const Header: Component = () => (
  <header class="bg-slate-200">
    <nav class="h-full max-w-5xl mx-auto">
      <ul class="flex items-center justify-between text-lg gap-2">
        <li>
          <NavItem href="/" icon="fluent:calendar-edit-20-regular">
            <h1 class="font-cursive text-3xl p-2">
              <span class="text-black group-hover:text-slate-800 transition-colors duration-200">
                Mee
              </span>
              <span class="text-sky-500 group-hover:text-sky-700 transition-colors duration-200">
                time
              </span>
            </h1>
          </NavItem>
        </li>
        <li>
          <NavItem href="/about" icon="fluent:info-20-regular" />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
