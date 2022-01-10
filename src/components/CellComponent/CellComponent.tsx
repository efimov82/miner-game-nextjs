import { Cell, CellTypeEnum } from "../../common/cell";
import styles from "./CellComponent.module.scss";

type CellComponentProps = {
  cell: Cell;
  onCellClick: (i: string) => void;
  onCellMarked: (i: string) => void;
};

export function CellComponent({
  cell,
  onCellClick,
  onCellMarked,
}: CellComponentProps) {
  function getCellClass(cell: Cell): string[] {
    const res = [styles.cellWrapper];
    if (cell.isMarked) {
      res.push(styles.marked);
    }

    if (!cell.isOpen) {
      res.push(styles.close);
      return res;
    }

    if (cell.minesAround > 0) {
      res.push(styles.number);
      return res;
    }

    switch (cell.type) {
      case CellTypeEnum.empty:
        res.push(styles.empty);
        break;
      case CellTypeEnum.mine:
        res.push(styles.mine);
        break;
      default:
        
    }
    return res;
  }

  function getCellValue(value: Cell): string {
    if (value.isOpen && value.minesAround > 0) {
      return value.minesAround.toString();
    }

    return "";
  }

  function cellLeftClick() {
    onCellClick(cell.id);
  }

  function cellRightClick() {
    onCellMarked(cell.id);
  }

  return (
    <div
      onClick={cellLeftClick}
      onContextMenu={cellRightClick}
      key={cell.id}
      className={getCellClass(cell).join(" ")}
    >
      {/*<span style={{fontSize: "9px", padding: "10px"}}>{ props.cell.debugInfo }</span>*/}
      {getCellValue(cell)}
    </div>
  );
}
