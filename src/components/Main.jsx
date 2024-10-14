// Main.jsx
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import blocks from "../assets/blocks.png";
import general from "../assets/General.png";
import design from "../assets/design.png";
import integration from "../assets/integration.png";
import search from "../assets/search.png";
import SortableRow from "./SortableRow";

const initialColors = [
  { id: "1", name: "Secondary", value: "#ED1976" },
  { id: "2", name: "Primary", value: "#156BED" },
  { id: "3", name: "Title Text", value: "#000000" },
  { id: "4", name: "Supporting Text", value: "#595959" },
];

const Main = () => {
  const [colors, setColors] = useState(initialColors);

  // Handle drag end and reorder the list
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = colors.findIndex((color) => color.id === active.id);
      const newIndex = colors.findIndex((color) => color.id === over.id);

      const newOrder = arrayMove(colors, oldIndex, newIndex);
      setColors(newOrder);
    }
  };

  return (
    <main>
      <div className="navbar-header">
        <div className="logo-blocks">
          <img src={blocks} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active-welcome">Welcome</a></li>
          <li><a href="#">Blocks</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>

      <div className="settings-section">
        <p className="settings">Settings</p>
        <div className="menu-section">
          <div className="menu">
            <p>MENU</p>
            <ul>
              <li><img src={general} alt="" /> General</li>
              <li className="active"><img src={design} alt="" /> Design System</li>
              <li><img src={integration} alt="" /> Integration</li>
            </ul>
          </div>

          <div className="main-content">
            <div className="header">
              <p>Design System</p>
              <hr />
              <div className="design-system-tab">
                <ul className="nav-links">
                  <li><a href="#" className="active-welcome">Color</a></li>
                  <li><a href="#">Typography</a></li>
                  <li><a href="#">Shadow</a></li>
                </ul>
                <div className="search-container">
                  <input className="search-input" type="text" placeholder="Search..." />
                  <img className="search-icon" src={search} alt="" />
                </div>
              </div>
            </div>

            <div className="color-settings-container">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={colors.map((color) => color.id)}
                  strategy={verticalListSortingStrategy}
                >
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
                        <SortableRow key={color.id} color={color} />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
              <button className="add-color">+ Add Color</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
