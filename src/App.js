import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Boids from "./components/Boids";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="boids" element={<Boids />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
