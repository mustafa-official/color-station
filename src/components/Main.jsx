// Main.jsx
import { useState } from "react";
import { DndProvider } from "react-dnd"; // Import DndProvider
import { HTML5Backend } from "react-dnd-html5-backend"; // Import HTML5 backend
import blocks from "../assets/blocks.png";
import general from "../assets/General.png";
import design from "../assets/design.png";
import integration from "../assets/integration.png";
import search from "../assets/search.png";
import SortableRow from "./SortableRow";

const initialColors = [
  { id: 1, name: "Secondary", value: "#ED1976" },
  { id: 2, name: "Primary", value: "#156BED" },
  { id: 3, name: "Title Text", value: "#000000" },
  { id: 4, name: "Supporting Text", value: "#595959" },
];

const Main = () => {
  const [colors, setColors] = useState(initialColors);

  const handleDragEnd = (draggedId, targetId) => {
    if (draggedId !== targetId) {
      const draggedColor = colors.find((color) => color.id === draggedId);
      const targetIndex = colors.findIndex((color) => color.id === targetId);
      const updatedColors = colors.filter((color) => color.id !== draggedId);
      updatedColors.splice(targetIndex, 0, draggedColor); // Insert dragged color at target index
      setColors(updatedColors); // Update state
    }
  };
  // Function to update color by id
  const updateColor = (id, updatedColor) => {
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, ...updatedColor } : color
    );
    setColors(updatedColors); // Update state with new values
  };

  const handleDuplicateColor = (duplicatedColor) => {
    setColors((prevColors) => [...prevColors, duplicatedColor]);
  };
  const handleDeleteColor = (id) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <div className="navbar-header">
          <div className="logo-blocks">
            <img src={blocks} alt="Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <a href="#" className="active-welcome">
                Welcome
              </a>
            </li>
            <li>
              <a href="#">Blocks</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>

        <div className="settings-section">
          <p className="settings">Settings</p>
          <div className="menu-section">
            <div className="menu">
              <p>MENU</p>
              <ul>
                <li>
                  <img src={general} alt="" /> General
                </li>
                <li className="active">
                  <img src={design} alt="" /> Design System
                </li>
                <li>
                  <img src={integration} alt="" /> Integration
                </li>
              </ul>
            </div>

            <div className="main-content">
              <div className="header">
                <p>Design System</p>
                <hr />
                <div className="design-system-tab">
                  <ul className="nav-links">
                    <li>
                      <a href="#" className="active-welcome">
                        Color
                      </a>
                    </li>
                    <li>
                      <a href="#">Typography</a>
                    </li>
                    <li>
                      <a href="#">Shadow</a>
                    </li>
                  </ul>
                  <div className="search-container">
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Search..."
                    />
                    <img className="search-icon" src={search} alt="" />
                  </div>
                </div>
              </div>

              <div className="color-settings-container">
                <table className="color-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colors.map((color) => (
                      <SortableRow
                        key={color.id}
                        color={color}
                        onDragEnd={handleDragEnd}
                        onUpdateColor={updateColor}
                        onDuplicateColor={handleDuplicateColor}
                        onDeleteColor={handleDeleteColor}
                      />
                    ))}
                  </tbody>
                </table>
                <button className="add-color">+ Add Color</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DndProvider>
  );
};

export default Main;
