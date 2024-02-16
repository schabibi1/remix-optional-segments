import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContact } from "../data";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const singleContact = await getContact(params.contactId);
  const lang = params.lang

  if (!singleContact) {
    throw new Response("Not Found", { status: 404 });
  }

  const { details, ...contact } = singleContact;
  return json({ contact, lang, details });
};

export default function Contact() {
  const { contact, details, lang } = useLoaderData<typeof loader>();
  return (
    <div id="contact">
      <div>
        <img
          alt={`${details?.en?.first} ${details?.en?.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {details?.ja?.first || details?.ja?.last || details?.en?.first || details?.en?.last ? (
            <>
              {lang === "ja" ? `${details?.ja?.first} ${details?.ja?.last}` : `${details?.en?.first} ${details?.en?.last}`}
            </>
          ) : (
            <i>No Name</i>
          )}
        </h1>

        {contact.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}
      </div>
    </div>
  );
}