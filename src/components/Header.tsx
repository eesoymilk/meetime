import { Icon } from "@iconify-icon/solid";
import { A, useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";

const navItems = [{ name: "About", href: "/about" }];

const Header = () => {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
    <header class="bg-slate-100">
      <div class="h-full flex max-w-5xl mx-auto gap-2 justify-center items-center">
        <A href="/">
          <h1 class="font-cursive text-3xl flex gap-2 items-center">
            <Icon
              icon="fluent:calendar-edit-20-regular"
              class="text-sky-500 text-3xl"
            />
            <span>
              Mee<span class="text-sky-500">time</span>
            </span>
          </h1>
        </A>
        <nav>
          <ul class="flex items-center text-lg">
            <For each={navItems}>
              {(item) => (
                <li
                  class="p-3"
                  classList={{ "bg-sky-300": pathname() === item.href }}
                >
                  <A href={item.href}>{item.name}</A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
