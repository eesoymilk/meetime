import { Title } from "@solidjs/meta";
import type { Component } from "solid-js";
import Calendar from "~/components/Calendar";

const Home: Component = () => {
  return (
    <main>
      <Title>Home Page</Title>
      <h2 class="text-center text-2xl font-bold">New Event</h2>
      <div class="flex flex-col md:flex-row justify-center items-center">
        <div>
          <h3 class="text-xl font-semibold">Dates</h3>
          <Calendar />
        </div>
        <div>
          <h3 class="text-xl font-semibold">Times</h3>
        </div>
      </div>
    </main>
  );
};

export default Home;
