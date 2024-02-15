import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getContact } from "../data";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const fullContact = await getContact(params.contactId);
  const lang = params.lang

  if (!fullContact) {
    throw new Response("Not Found", { status: 404 });
  }

  const { details, ...contact } = fullContact;
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

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}