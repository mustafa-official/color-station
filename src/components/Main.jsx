import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import blocks from "../assets/blocks.png";
import general from "../assets/General.png";
import design from "../assets/design.png";
import integration from "../assets/integration.png";
import search from "../assets/search.png";
import SortableRow from "./SortableRow";
import { ChromePicker } from "react-color";

const initialColors = [
  { id: 1, name: "Secondary", value: "#ED1976" },
  { id: 2, name: "Primary", value: "#156BED" },
  { id: 3, name: "Title Text", value: "#000000" },
  { id: 4, name: "Supporting Text", value: "#595959" },
];

const Main = () => {
  const [colors, setColors] = useState(initialColors);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: "",
    value: "#ffffff",
  });

  const handleDragEnd = (draggedId, targetId) => {
    if (draggedId !== targetId) {
      const draggedColor = colors.find((color) => color.id === draggedId);
      const targetIndex = colors.findIndex((color) => color.id === targetId);
      const updatedColors = colors.filter((color) => color.id !== draggedId);
      updatedColors.splice(targetIndex, 0, draggedColor);
      setColors(updatedColors);
    }
  };

  const updateColor = (id, updatedColor) => {
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, ...updatedColor } : color
    );
    setColors(updatedColors);
  };

  const addNewColor = (newColor) => {
    setColors((prevColors) => [...prevColors, { ...newColor, id: Date.now() }]);
  };

  const openDrawer = (color = { name: "", value: "#ffffff" }) => {
    setSelectedColor(color);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedColor({ name: "", value: "#ffffff" }); // Reset selectedColor when closing
  };

  const handleColorChange = (color) => {
    setSelectedColor((prev) => ({ ...prev, value: color.hex }));
  };

  const handleSubmit = () => {
    if (selectedColor.id) {
      updateColor(selectedColor.id, selectedColor);
    } else {
      addNewColor(selectedColor);
    }
    closeDrawer();
  };

  const handleDuplicateColor = (duplicatedColor) => {
    addNewColor(duplicatedColor);
  };

  const handleDeleteColor = (id) => {
    setColors((prevColors) => prevColors.filter((color) => color.id !== id));
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
                      <th></th>
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
                <button className="add-color" onClick={() => openDrawer()}>
                  + Add Color
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <div className="drawer-main">
            <div className="drawer-content">
              <p>Name</p>
              <input
              required
                name="name"
                type="text"
                value={selectedColor.name} // Controlled input for name
                onChange={(e) =>
                  setSelectedColor({ ...selectedColor, name: e.target.value })
                }
              />
              <hr className="line" />

              <p>Value</p>
              <div className="value-color">
                <h5>Color</h5>
                <div className="color-container">
                  <div
                    className="color-box"
                    style={{ backgroundColor: selectedColor.value }}
                  ></div>
                  <input
                  required
                    className="input-text"
                    type="text"
                    value={selectedColor.value} // Controlled input for value
                    onChange={(e) =>
                      setSelectedColor({
                        ...selectedColor,
                        value: e.target.value,
                      })
                    } // Allow editing of the color value
                  />
                </div>

                <ChromePicker
                  color={selectedColor.value}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="drawer-btn">
              <button onClick={closeDrawer}>Cancel</button>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="drawer-overlay" onClick={closeDrawer}></div>
        )}
      </main>
    </DndProvider>
  );
};

export default Main;
