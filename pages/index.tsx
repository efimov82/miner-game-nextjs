import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Home: NextPage = () => {
  const { t } = useTranslation("rules");

  return (
    <>
      <div className="row m-2">
        <div className="col">
          <div className="row">
            <div className="col col-sm-8">
              <h1>{t("title")}</h1>
              <p>{t("description")}</p>

              <h2>{t("gameplay")}</h2>
              <p>{t("rules")}</p>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Link href="/game">
            <a className="btn btn-primary">{t("start-game")}</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["rules", "menu"])),
  },
});

export default Home;
