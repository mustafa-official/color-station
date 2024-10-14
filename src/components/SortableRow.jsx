// SortableRow.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import button from "../assets/Button.png";

const SortableRow = ({ color }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: color.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
        <button>
          <img src={button} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default SortableRow;
