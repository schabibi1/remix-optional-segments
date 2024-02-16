import { Link, useLocation, useParams } from "@remix-run/react";

export default function Header() {
  const { pathname } = useLocation();
  const { lang } = useParams<{ lang?: string }>();

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
