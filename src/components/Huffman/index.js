import "./index.scss";
import App from "../../compression-visualizer/App";
import Sidebar from "../Sidebar";

const Huffman = () => {
  return (
    <div>
      <Sidebar />
      <div className="huff-page">
        <div className="huff-container">
          <App />
        </div>
      </div>
    </div>
  );
};

export default Huffman;
