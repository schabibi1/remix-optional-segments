import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { getContacts } from "~/data";
import { getLang } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const fullContact = await getContacts();
  const lang = getLang(params);

  const contacts = fullContact.map((contact) => ({
    id: contact.id,
    name: `${contact.details?.[lang]?.first} ${contact.details?.[lang]?.last}`,
  }));

  return json({ contacts, lang });
};

export default function ContactsLayout() {
  const { contacts, lang } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <div id="wrapper">
        <div id="sidebar">
          <h1>{lang === "ja" ? `Remix コンタクト` : `Remix Contacts`}</h1>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map(({ id, name }) => {
                  return (
                    <li key={id}>
                      <Link to={`${id}`}>{name}</Link>
                    </li>
                  );
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
    </>
  );
}
