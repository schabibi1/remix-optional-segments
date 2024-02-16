import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import appStylesHref from "./app.css";
import { getContacts } from "./data";
import Header from "./components/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const fullContact = await getContacts();
  const lang = params.lang
  return json({ fullContact, lang });
};

export default function App() {
  const { fullContact, lang } = useLoaderData<typeof loader>();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <div id="wrapper">
          <div id="sidebar">
            <h1>{lang === "ja" ? `Remix コンタクト` : `Remix Contacts`}</h1>
            <nav>
              {fullContact.length ? (
                <ul>
                  {fullContact.map((contact) => {
                    return (
                      <li key={contact.id}>
                        <Link to={`contacts/${contact.id}`}>
                          {lang === "ja" ? contact.details?.ja?.first : contact.details?.en?.first} {lang === "ja" ? contact.details?.ja?.last : contact.details?.en?.last}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </nav>
          </div>
          <div id="detail">
            <Outlet />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
