import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorAdd, setColorAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(colorToEdit.id);
        axiosWithAuth()
          .get("api/colors")
          .then((res) => {
            updateColors(res.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`api/colors/${color.id}`)
      .then((res) => {
        updateColors(
          colors.filter((item) => {
            if (res.data !== item.id) {
              return item;
            }
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/colors/", addColor)
      .then((res) => {
        updateColors([...colors, colorAdd]);
      });
    console.log(colors);
  };
  return (
    <div className="colors-wrap">
      <div className="add-color">
        <label>
          <div className="color-details">
            color:
            <input
              onChange={(e) =>
                setColorAdd({ ...colorAdd, color: e.target.value })
              }
              value={colorAdd.color}
            />
          </div>
          <div className="color-details">
            hex:
            <input
              onChange={(e) =>
                setColorAdd({ ...colorAdd, hex: e.target.value })
              }
              value={colorAdd.color.hex}
            />
          </div>
        </label>
      </div>
      <button onClick={addColor}>add color</button>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={() => deleteColor}>delete</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;
