import { Link, useLocation, useParams } from "@remix-run/react";
import { getLang } from "~/utils";

export default function Header() {
  const { pathname } = useLocation();
  const params = useParams();
  const lang = getLang(params);

  return (
    <div id="header">
      <h1>
        {lang === "ja" ? `Optional Segments デモ` : `Optional Segments Example`}
      </h1>
      <nav>
        {lang === "ja" ? (
          <Link to={pathname.replace(/^\/ja/, "")}>🇺🇸</Link>
        ) : (
          <Link to={`/ja${pathname}`}>🇯🇵</Link>
        )}
      </nav>
    </div>
  );
}
