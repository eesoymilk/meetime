import { MetaProvider, Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import Header from "./components/Header";

import type { ParentComponent } from "solid-js";

const Layout: ParentComponent = (props) => (
  <MetaProvider>
    <Title>SolidStart - Basic</Title>
    <div class="overflow-y-scroll">
      <Header />
      <Suspense>
        <main class="bg-slate-100 min-h-svh">{props.children}</main>
      </Suspense>
    </div>
  </MetaProvider>
);

export default Layout;
