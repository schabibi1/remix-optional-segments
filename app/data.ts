////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  details?: {
    en?: {
      first?: string;
      last?: string;
    },
    ja?: {
      first?: string;
      last?: string;
    }
  }
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
    twitter: "@shrutikapoor08",
    details: {
      en: {
        first: "Shruti",
        last: "Kapoor",
      },
      ja: {
        first: "シュルティー",
        last: "カプアー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
    twitter: "@glnnrys",
    details: {
      en: {
        first: "Glenn",
        last: "Reyes",
      },
      ja: {
        first: "グレン",
        last: "レイス",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
    details: {
      en: {
        first: "Ryan",
        last: "Florence",
      },
      ja: {
        first: "ライアン",
        last: "フローレンス",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
    twitter: "@__oscarnewman",
    details: {
      en: {
        first: "Oscar",
        last: "Newman",
      },
      ja: {
        first: "オスカー",
        last: "ニューマン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
    details: {
      en: {
        first: "Michael",
        last: "Jackson",
      },
      ja: {
        first: "マイケル",
        last: "ジャクソン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
    twitter: "@Vjeux",
    details: {
      en: {
        first: "Christopher",
        last: "Chedeau",
      },
      ja: {
        first: "クリストファー",
        last: "シェドー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
    twitter: "@cmatheson",
    details: {
      en: {
        first: "Cameron",
        last: "Matheson",
      },
      ja: {
        first: "キャメロン",
        last: "マデソン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
    twitter: "@BrooksLybrand",
    details: {
      en: {
        first: "Brooks",
        last: "Lybrand",
      },
      ja: {
        first: "ブルックス",
        last: "リーブランド",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
    twitter: "@ralex1993",
    details: {
      en: {
        first: "Alex",
        last: "Anderson",
      },
      ja: {
        first: "アレックス",
        last: "アンダーソン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
    twitter: "@kentcdodds",
    details: {
      en: {
        first: "Kent C.",
        last: "Dodds",
      },
      ja: {
        first: "ケント C.",
        last: "ドッズ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg",
    twitter: "@nevikashah",
    details: {
      en: {
        first: "Nevi",
        last: "Shah",
      },
      ja: {
        first: "ネヴィ",
        last: "シャー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png",
    details: {
      en: {
        first: "Andrew",
        last: "Petersen",
      },
      ja: {
        first: "アンドリュー",
        last: "ピーターソン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
    twitter: "@smerchek",
    details: {
      en: {
        first: "Scott",
        last: "Smerchek",
      },
      ja: {
        first: "スコット",
        last: "スメアシェック",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg",
    twitter: "@giovannibenussi",
    details: {
      en: {
        first: "Giovanni",
        last: "Benussi",
      },
      ja: {
        first: "ジョヴァンニ",
        last: "ベノッシ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg",
    twitter: "@IgorMinar",
    details: {
      en: {
        first: "Igor",
        last: "Minar",
      },
      ja: {
        first: "イゴール",
        last: "ミネア",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg",
    details: {
      en: {
        first: "Brandon",
        last: "Kish",
      },
      ja: {
        first: "ブランドン",
        last: "キッシュ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png",
    twitter: "@arisa_dev",
    details: {
      en: {
        first: "Arisa",
        last: "Fukuzaki",
      },
      ja: {
        first: "有彩",
        last: "福﨑",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg",
    twitter: "@alexadark",
    details: {
      en: {
        first: "Alexandra",
        last: "Spalato",
      },
      ja: {
        first: "アレクサンドラ",
        last: "スパラト",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg",
    details: {
      en: {
        first: "Cat",
        last: "Johnson",
      },
      ja: {
        first: "キャット",
        last: "ジョンソン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg",
    twitter: "@_darkfadr",
    details: {
      en: {
        first: "Ashley",
        last: "Narcisse",
      },
      ja: {
        first: "アシュリー",
        last: "ナッシス",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG",
    twitter: "@_edmundhung",
    details: {
      en: {
        first: "Edmund",
        last: "Hung",
      },
      ja: {
        first: "エドムンド",
        last: "ハン",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg",
    twitter: "@cliffordfajard0",
    details: {
      en: {
        first: "Clifford",
        last: "Fajardo",
      },
      ja: {
        first: "クリフォード",
        last: "ファハルド",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg",
    twitter: "@ericktamayo",
    details: {
      en: {
        first: "Erick",
        last: "Tamayo",
      },
      ja: {
        first: "エリック",
        last: "タマヨ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg",
    twitter: "@codingthirty",
    details: {
      en: {
        first: "Paul",
        last: "Bratslavsky",
      },
      ja: {
        first: "パウル",
        last: "ブラッツラヴィスキー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg",
    twitter: "@pcattori",
    details: {
      en: {
        first: "Pedro",
        last: "Cattori",
      },
      ja: {
        first: "ペドロ",
        last: "カトーリ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg",
    twitter: "@AndreLandgraf94",
    details: {
      en: {
        first: "Andre",
        last: "Landgraf",
      },
      ja: {
        first: "アンドレ",
        last: "ラングラフ",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg",
    twitter: "@indigitalcolor",
    details: {
      en: {
        first: "Monica",
        last: "Powell",
      },
      ja: {
        first: "モニカ",
        last: "パウエル",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg",
    twitter: "@brian_dlee",
    details: {
      en: {
        first: "Brian",
        last: "Lee",
      },
      ja: {
        first: "ブランアン",
        last: "リー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg",
    twitter: "@SeanMcQuaidCode",
    details: {
      en: {
        first: "Sean",
        last: "McQuaid",
      },
      ja: {
        first: "ショーン",
        last: "マクワイド",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg",
    twitter: "@swalker326",
    details: {
      en: {
        first: "Shane",
        last: "Walker",
      },
      ja: {
        first: "シェーン",
        last: "ウォーカー",
      }
    },
  },
  {
    avatar:
      "https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg",
    twitter: "@jenseng",
    details: {
      en: {
        first: "Jon",
        last: "Jensen",
      },
      ja: {
        first: "ジョン",
        last: "ジェンセン",
      }
    },
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.details?.en.first.toLowerCase()}-${contact.details?.en.last.toLocaleLowerCase()}`,
  });
});
