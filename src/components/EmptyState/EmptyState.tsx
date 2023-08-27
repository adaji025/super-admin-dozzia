import React from "react";
import EmptyImg from "../../assets/svg/EmptyState-2.svg";
import "./empty-state.scss";

interface EmptyStateProps {
  title?: string;
  desc?: string;
}
const EmptyState = ({ title, desc }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <img src={EmptyImg} alt="" />
      <div className="title">{title ?? "There is no data to display"}</div>
      <div className="desc">
        {desc ?? "At the moment, there is no data to be displayed."}
      </div>
    </div>
  );
};

export default EmptyState;
