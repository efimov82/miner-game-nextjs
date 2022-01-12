import { useTranslation } from "next-i18next";
import Head from "next/head";

type PageHeaderProps = {
  title: string;
};

export default function PageHeaderComponent(props: PageHeaderProps) {
  const { t } = useTranslation(["common"]);

  return (
    <Head>
      <title>Minesweeper game</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}
