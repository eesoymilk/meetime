import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import Layout from "./layout";
import type { Component } from "solid-js";

const App: Component = () => (
  <Router root={Layout}>
    <FileRoutes />
  </Router>
);

export default App;
