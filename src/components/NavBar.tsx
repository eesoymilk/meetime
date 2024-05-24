import { A, useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";

const navItems = [
  { name: "Index", href: "/" },
  { name: "About", href: "/about" },
];

const NavBar = () => {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
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
  );
};

export default NavBar;
