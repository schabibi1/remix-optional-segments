import { Link, useLocation, useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, json } from "@remix-run/node";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const lang = params.lang
  return json({ lang });
};

export default function Header() {
  let { lang } = useLoaderData<typeof loader>();
  console.log("LANG: ", lang);

  const location = useLocation();
  const locationEntries = Object.entries(location)
  const pathname = locationEntries[0]
  const enPathname = pathname[1].includes("/ja") ? pathname[1].replace("/ja", "") : pathname[1]

  return (
    <div id="header">
      <h1>{lang === "ja" ? `Optional Segments デモ` : `Optional Segments Example`}</h1>
      <nav>
        <Link to={`${enPathname}`}>🇺🇸</Link>
        <Link to={`${lang = "ja"}${location.pathname}`}>🇯🇵</Link>
      </nav>
    </div>
  )
}