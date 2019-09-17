import React from "react";
import "./Button.scss";

interface IProps {
  onClick?: () => void
}

export default class Button extends React.Component<IProps>{

  public render() {
    const { children } = this.props;
    return  (
      <div onClick={this.props.onClick} className="button">
          {
            children
          }
      </div>
    );
  }
}

