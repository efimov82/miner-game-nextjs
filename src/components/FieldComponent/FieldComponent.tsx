import React from "react";
import { Cell } from "../../common/cell";
import { CellComponent } from "../CellComponent/CellComponent";
import styles from "./FieldComponent.module.css";

type FieldComponentProps = {
  onCellClick: (cellId: string) => void;
  onCellMarked: (cellId: string) => void;
  field: { data: Cell[][] } | null;
};

export class FieldComponent extends React.PureComponent<
  FieldComponentProps,
  {}
> {
  componentDidMount() {
    document.addEventListener("contextmenu", this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleContextMenu);
  }

  handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  render() {
    if (!this.props.field) {
      return <></>;
    }

    const fieldMap = this.props.field.data.map((row, rowIndex) => {
      const rowComponent = row.map((cell, cellIndex) => {
        return (
          <div className={styles.filedRow} key={cellIndex.toString()}>
            <CellComponent
              cell={cell}
              onCellClick={this.props.onCellClick}
              onCellMarked={this.props.onCellMarked}
            />
          </div>
        );
      });

      return (
        <div key={rowIndex.toString()} className={styles.filedRow}>
          {rowComponent}
        </div>
      );
    });

    return (
      <div className="field-component">
        <div className="field">{fieldMap}</div>
      </div>
    );
  }
}
