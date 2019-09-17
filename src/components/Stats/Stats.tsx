import React from "react";
import "./Stats.scss";
import { IPrepStat } from "../../stores/models/pokemon.model";
import StatItem from "../Statitem/StatItem";

interface IProps {
  title?: string,
  hideImage?: boolean,
  stats: IPrepStat[],
  onClickStat?: (stat: IPrepStat) => any;
}

export default class Stats extends React.Component<IProps>{

  public render() {
  const { title } = this.props;
    return  (
      <div className="stats">
        {title && <div className="title">{title}</div>}
        {this.printStats()}
      </div>


    );
  }

  private printStats() {
    const  { hideImage , onClickStat } = this.props;
    return this.props.stats.map( stat => <StatItem onClick={() => onClickStat && onClickStat(stat)} key={stat.name} text={stat.value.toString()} image={!hideImage ? stat.name : ''}/>)
  }
}

