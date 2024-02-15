import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
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
  let { fullContact, lang } = useLoaderData<typeof loader>();

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {fullContact.length ? (
              <ul>
                {fullContact.map((contact) => {
                  return (
                    <li key={contact.id}>
                      <Link to={`contacts/${contact.id}`}>
                        {contact.details?.en?.first} {contact.details?.en?.last}
                      </Link>
                      {/* 🗒️ TODO: Add global header component 🗒️ */}
                      <Link to={`contacts/${contact.id}`}>🇺🇸</Link>
                      <Link to={`${lang = "ja"}/contacts/${contact.id}`}>🇯🇵</Link>
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

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
