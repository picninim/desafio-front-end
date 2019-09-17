import React from "react";
import "./StatItem.scss";

interface IProps {
  image?: string,
  text: string,
  onClick?: () => void;
}

export default class StatItem extends React.Component<IProps>{

  public render() {
    const { image, text, onClick } = this.props;
    return  (
      <div onClick={onClick} className="stat">
        { image && <div className={`image ${image}`} /> }
        <div className="text">{text}</div>
      </div>
    );
  }
}

