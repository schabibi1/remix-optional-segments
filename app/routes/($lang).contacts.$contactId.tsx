import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContact } from "../data";
import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getLang } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const lang = getLang(params);
  const singleContact = await getContact(params.contactId);

  if (!singleContact) {
    throw new Response("Not Found", { status: 404 });
  }

  const { avatar, twitter, notes, details } = singleContact;
  const name = `${details?.[lang]?.first} ${details?.[lang]?.last}`;
  return json({ avatar, twitter, notes, name });
};

export default function Contact() {
  const { avatar, twitter, notes, name } = useLoaderData<typeof loader>();
  return (
    <div id="contact">
      <div>
        <img alt={`${name} avatar`} key={avatar} src={avatar} />
      </div>

      <div>
        <h1>{name}</h1>

        {twitter ? (
          <p>
            <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
          </p>
        ) : null}

        {notes ? <p>{notes}</p> : null}
      </div>
    </div>
  );
}
