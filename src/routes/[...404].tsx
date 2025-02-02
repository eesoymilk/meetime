import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import type { Component } from "solid-js";

const NotFound: Component = () => {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
    </main>
  );
};

export default NotFound;
