import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { withTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { formatDate, formatTime } from "../src/common/date-time.functions";
import { fetchTop } from "../src/services/game.service";
import { Winner } from "../src/models";
import { LoaderComponent } from "../src/components/LoaderComponent/LoaderComponent";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["menu"])),
  },
});

function TopComponent() {
  const { t } = useTranslation("rules");
  const { status, error, data } = useQuery<Winner[], Error>(
    ["top-query", { count: 20 }],
    fetchTop
  );

  if (status === "loading") {
    return (
      <div className="loader d-flex p-50 justify-content-center">
        <LoaderComponent />
      </div>
    );
  }
  if (status === "error") {
    return <div>{error!.message}</div>;
  }

  return data ? (
    <>
      <div className="container">
        <h1>Top 20</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nick</th>
              <th scope="col">Field</th>
              <th scope="col">Mines</th>
              <th scope="col">Time</th>
              <th scope="col" className="d-none">Date</th>
            </tr>
          </thead>
          <tbody>{formatTopResults(data)}</tbody>
        </table>
      </div>
    </>
  ) : null;

  function formatTopResults(data: Winner[]) {
    const content = data.map((winner, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{winner.nickName}</td>
          <td>{winner.fieldSize}</td>
          <td>{winner.countMines}</td>
          <td>{formatTime(winner.gameTime)}</td>
          <td className="d-none">{formatDate(winner.timestamp)}</td>
        </tr>
      );
    });

    return content;
  }

}

export default withTranslation(["menu"])(TopComponent);
