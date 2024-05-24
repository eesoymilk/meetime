import { Icon } from "@iconify-icon/solid";
import { A } from "@solidjs/router";
import type { ParentComponent } from "solid-js";

interface NavItemProps {
  href: string;
  icon: string;
}

const NavItem: ParentComponent<NavItemProps> = (props) => (
  <A href={props.href} class="group flex gap-2 items-center">
    <Icon
      icon={props.icon}
      class="text-sky-500 group-hover:text-sky-700 transition-colors duration-200"
      height={32}
    />
    {props.children}
  </A>
);

export default NavItem;
