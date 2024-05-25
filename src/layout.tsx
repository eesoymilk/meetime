import { MetaProvider, Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import Header from "./components/Header";

import type { ParentComponent } from "solid-js";
import Footer from "./components/Footer";

const Layout: ParentComponent = (props) => (
  <MetaProvider>
    <Title>SolidStart - Basic</Title>
    <div class="overflow-y-scroll flex flex-col min-h-svh">
      <Header />
      <Suspense>
        <main class="bg-slate-100 flex-1 min-h-0">{props.children}</main>
      </Suspense>
      <Footer />
    </div>
  </MetaProvider>
);

export default Layout;
