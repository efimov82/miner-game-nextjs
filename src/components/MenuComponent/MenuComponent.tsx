import Link from "next/link";
import { useTranslation } from "next-i18next";
import { LangSwitcherComponent } from "../LangSwitcherComponent/LangSwitcherComponent";

export function MenuComponent(props: {}) {
  const { t } = useTranslation("menu");

  return (
    <div className="row m-2">
      <div className="col">
        <div className="row menu-wrapper">
          <div className="col-3 col-sm-3 m-2">
            <Link href="/">{t("rules")}</Link>
          </div>
          <div className="col-3 col-sm-3 m-2">
            <Link href="/top">{t("top20")}</Link>
          </div>
          <div className="col-3 col-sm-3 m-2">
            <LangSwitcherComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
