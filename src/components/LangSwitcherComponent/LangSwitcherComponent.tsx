import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./LangSwitcherComponent.module.scss";

export function LangSwitcherComponent(props: {}) {
  const router = useRouter();
  const showEn = router.locale === "ru";

  return (
    <>
      {!showEn && (
        <Link href="/ru" locale="ru">
          <a className={styles.flagRu} />
        </Link>
      )}
      {showEn && (
        <Link href="/" locale="en">
          <a className={styles.flagEn} />
        </Link>
      )}
    </>
  );
}
