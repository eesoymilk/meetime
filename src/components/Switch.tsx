import { Component, createMemo, For } from "solid-js";

const SwitchButton: Component<{ switchItems: string[] }> = () => {
  return (
    <button
      type="button"
      class="relative block h-8 w-16 rounded-2xl outline outline-1 outline-black transition-all duration-200 dark:outline-white"
    >
      switch button
      {/* <span
        class="absolute h-8 w-8 text-black transition-all duration-200 dark:text-white {$locale ===
    'en'
      ? 'translate-x-[100%]'
      : 'translate-x-2'} top-0 flex h-full items-center"
      ></span> */}
    </button>
  );
};

export default SwitchButton;
