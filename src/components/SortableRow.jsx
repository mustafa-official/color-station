import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import button from "../assets/Button.png";

const ItemType = "COLOR_ROW";

const SortableRow = ({ color, onDragEnd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state
  const [selectedColor, setSelectedColor] = useState({ name: "", value: "" }); // Store selected color details

  const nameRef = useRef(null); // Ref for name input
  const colorRef = useRef(null); // Ref for color input

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: color.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      onDragEnd(item.id, color.id); // Call drag end handler
    },
  });

  const ref = React.useRef(null);
  const dragDropRef = drag(drop(ref));

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDrawerOpen(false); // Ensure drawer closes when modal closes
  };

  const openDrawer = () => {
    setSelectedColor({ name: color.name, value: color.value }); // Set selected color
    setIsDrawerOpen(true); // Open drawer
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const name = nameRef.current.value; // Get name from ref
    const value = colorRef.current.value; // Get color value from ref

    console.log("Submitted:", { name, value });

    // Optionally: Handle the submitted values (e.g., save to state or send to server)
    closeDrawer(); // Close drawer after submission
  };

  return (
    <>
      <tr ref={dragDropRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <td>
          <span className="icon">🎨</span> {color.name}
        </td>
        <td>
          <div
            className="color-box"
            style={{ backgroundColor: color.value }}
          ></div>
          <input type="text" value={color.value} readOnly />
        </td>
        <td className="edit-button">
          <button onClick={openModal}>
            <img src={button} alt="Edit" />
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ul>
              <li>
                <button onClick={openDrawer}>Edit</button> {/* Open Drawer */}
              </li>
              <li>
                <button>Duplicate</button>
              </li>
              <li>
                <button>Delete</button>
              </li>
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {/* Drawer */}
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-main">
          <div className="drawer-content">
            <p>Name</p>
            <input
              ref={nameRef} // Ref for name input
              name="name"
              type="text"
              defaultValue={selectedColor.name}
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
                  ref={colorRef} // Ref for color input
                  name="color"
                  className="input-text"
                  type="text"
                  defaultValue={selectedColor.value}
                />
              </div>
            </div>
          </div>
          <div className="drawer-btn">
            <button onClick={closeDrawer}>Cancel</button>
            <button onClick={handleSubmit}>Save</button> {/* Save button */}
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={closeDrawer}></div>
      )}
    </>
  );
};

export default SortableRow;
