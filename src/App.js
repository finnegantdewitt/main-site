import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Boids from "./components/Boids";
import BoidsLayout from "./components/BoidsLayout";
import Huffman from "./components/Huffman";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="huffman" element={<Huffman />} /> */}
          {/* <Route path="boids" element={<Boids />} /> */}
        </Route>
        <Route path="/boids" element={<BoidsLayout />}>
          <Route index element={<Boids />} />
        </Route>
        <Route path="/huffman" element={<Huffman />} />
      </Routes>
      <div id="mountingForBoids"></div>
    </>
  );
}

export default App;
