import Link from "next/link";

export function MenuComponent(props: {}) {
  return (
    <div className="row menu-wrapper">
      <div className="col-4 col-sm-3 m-2">
        <Link href="/">Rules</Link>
      </div>
      <div className="col-4 col-sm-3 m-2">
        <Link href="/top">TOP 20</Link>
      </div>
    </div>
  );
}
