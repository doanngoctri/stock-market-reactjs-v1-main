import React from "react";
import "./styles.css";

const Popup = ({ visible, x, y, liked, onClick }) =>
  visible && (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li onClick={onClick}>{liked ? "Bỏ thích " : "Yêu Thích"}</li>
    </ul>
  );

export default Popup;
