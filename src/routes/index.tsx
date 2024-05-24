import { Title } from "@solidjs/meta";
import { clientOnly } from "@solidjs/start";
import type { Component } from "solid-js";

const NewEvent = clientOnly(() => import("~/components/NewEvent"));

const Home: Component = () => {
  return (
    <main>
      <Title>Home Page</Title>
      <NewEvent />
    </main>
  );
};

export default Home;
