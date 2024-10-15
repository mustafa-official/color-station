import { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ChromePicker } from "react-color";
import button from "../assets/Button.png";
import edit from "../assets/edit.png";
import duplicate from "../assets/copy.png";
import trash from "../assets/Trash.png";
import frame from "../assets/Frame.png";

const ItemType = "COLOR_ROW";

const SortableRow = ({
  color,
  onDragEnd,
  onUpdateColor,
  onDuplicateColor,
  onDeleteColor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    name: color.name,
    value: color.value,
  });

  const nameRef = useRef(null);
  const modalRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: color.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => onDragEnd(item.id, color.id),
  });

  const dragDropRef = drag(drop(useRef(null)));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleColorChange = (newColor) => {
    setSelectedColor((prev) => ({ ...prev, value: newColor.hex }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    onUpdateColor(color.id, { name, value: selectedColor.value });
    closeDrawer();
  };

  const handleDuplicate = () => {
    const duplicatedColor = {
      ...color,
      id: Date.now(),
      name: `${color.name} Copy`,
    };
    onDuplicateColor(duplicatedColor);
    closeModal();
  };

  const handleDelete = () => {
    onDeleteColor(color.id);
    console.log("Deleted:", color);
  };

  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <tr
        ref={dragDropRef}
        style={{
          opacity: isDragging ? 0.5 : 1,
          borderRadius: "10px",
          border: "1px solid #fff",
        }}
      >
        <td
          style={{
            position: "relative",
            paddingLeft: "30px",
            color: "#454D54",
          }}
        >
          <img className="frame-img" src={frame} alt="" />
          {color.name}
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <ul>
              <li>
                <button onClick={openDrawer}>
                  <img src={edit} alt="" /> Edit
                </button>
              </li>
              <li>
                <button onClick={handleDuplicate}>
                  <img src={duplicate} alt="" />
                  Duplicate
                </button>
              </li>
              <li>
                <button style={{ color: "#A7AAAD" }} onClick={handleDelete}>
                  <img src={trash} alt="" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-main">
          <div className="drawer-content">
            <p>Name</p>
            <input
              ref={nameRef}
              name="name"
              type="text"
              defaultValue={selectedColor.name}
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
                  className="input-text"
                  type="text"
                  value={selectedColor.value}
                  readOnly
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
    </>
  );
};

export default SortableRow;
