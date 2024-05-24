import { MetaProvider, Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import Header from "./components/Header";

import type { ParentComponent } from "solid-js";

const Layout: ParentComponent = (props) => (
  <MetaProvider>
    <Title>SolidStart - Basic</Title>
    <Header />
    <Suspense>{props.children}</Suspense>
  </MetaProvider>
);

export default Layout;
