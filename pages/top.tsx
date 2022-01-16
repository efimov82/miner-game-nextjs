import React, { ReactNode } from "react";
import { useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import { withTranslation } from "react-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { formatDate, formatTime } from "../src/common/date-time.functions";
import { fetchTop } from "../src/services/game.service";
import { Winner } from "../src/models";
import { Placeholder } from "react-bootstrap";

function TopComponent() {
  const { t } = useTranslation(["top"]);
  const { status, error, data } = useQuery<Winner[], Error>(
    ["top-query", { count: 20 }],
    fetchTop
  );

  // if (status === "loading") {
  //   return (
  //     <div className="loader d-flex p-50 justify-content-center">
  //       <LoaderComponent />
  //     </div>
  //   );
  // }
  if (status === "error") {
    return <div>{error!.message}</div>;
  }

  return (
    <div className="container">
      <h1>{t("title")}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t("nickname")}</th>
            <th scope="col">{t("field")}</th>
            <th scope="col">{t("mines")}</th>
            <th scope="col">{t("time")}</th>
            <th scope="col" className="d-none">
              {t("date")}
            </th>
          </tr>
        </thead>
        <tbody>{formatTopResults(data)}</tbody>
      </table>
    </div>
  );

  function formatTopResults(data: Winner[]): ReactNode {
    if (!data) return skeletonRows();

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

  function skeletonRows(): ReactNode {
    let res = [];
    for (let i = 0; i < 20; i++) {
      res.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <Placeholder as="td" animation="glow">
            <Placeholder xs={6} bg="secondary" />
          </Placeholder>
          <Placeholder as="td" animation="glow">
            <Placeholder xs={6} bg="secondary" />
          </Placeholder>
          <Placeholder as="td" animation="glow">
            <Placeholder xs={6} bg="secondary" />
          </Placeholder>
          <Placeholder as="td" animation="glow">
            <Placeholder xs={6} bg="secondary" />
          </Placeholder>
          <Placeholder className="d-none" as="td" animation="glow">
            <Placeholder xs={6} bg="secondary" />
          </Placeholder>
        </tr>
      );
    }
    return res;
  }
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["menu", "top"])),
  },
});

export default withTranslation(["menu", "top"])(TopComponent);
