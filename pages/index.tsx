import type { NextPage } from "next";
import Link from "next/link";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";

const Home: NextPage = () => {
  return (
    <>
      <div className="row m-2">
        <div className="col">
          <MenuComponent />
        </div>
      </div>
      <div className="row m-2">
        <div className="col">
          <div className="row">
            <div className="col col-sm-8">
              <h1>Welcome to the Minesweeper game!</h1>
              <p>
                In Minesweeper mines are scattered throughout a board, which is
                divided into cells. Cells have three states: uncovered, covered
                and flagged. A covered cell is blank and clickable, while an
                uncovered cell is exposed. Flagged cells are those marked by the
                player to indicate a potential mine location.
              </p>

              <h2>Gameplay</h2>
              <p>
                A player left-clicks a cell to uncover it. If a player uncovers
                a mined cell, the game ends, as there is only 1 life per game.
                Otherwise, the uncovered cell displays either a number,
                indicating the number of mines diagonally and/or adjacent to it,
                or a blank tile, and all adjacent non-mined cells will
                automatically be uncovered. Right-clicking (long-pressing on
                Mobile) on a cell will flag it, causing a flag to appear on it.
                Flagged cells are still considered covered, and a player can
                click on them to uncover them, although typically they must
                first be unflagged with an additional right-click. To win the
                game, player must flagging all the mined cells.
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Link href="/game">
            <a className="btn btn-primary">Start game</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
