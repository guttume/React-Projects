import React from "react";
import styled from "styled-components";
import Lane from "../components/Lane/Lane";
import withDataFetching from "../withDataFetching";

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  }

  onDragStart = (e, id) => {
    console.log(id);
    e.dataTransfer.setData("id", id);
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData("id");
    console.log(id, laneId);

    const tickets = this.state.tickets.filter((ticket) => {
      if (ticket.id === +id) {
        ticket.lane = laneId;
      }
      return ticket;
    });

    this.setState({ ...this.state, tickets });
  };

  render() {
    const { lanes, loading, error } = this.props;
    return (
      <BoardWrapper>
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            tickets={this.state.tickets.filter(
              (ticket) => ticket.lane === lane.id
            )}
          />
        ))}
      </BoardWrapper>
    );
  }
}

export default withDataFetching(Board);
