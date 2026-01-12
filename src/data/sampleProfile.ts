import type { Profile } from '../types/index';

// Public images from the data (filtered for public access and non-ad)
const imageUuids = [
  "2c29f88b-2e48-4684-96f6-b1f909e3f052",
  "94aaa28e-5cff-4b33-b411-74df6dcedd6a",
  "7b398a2a-9cb0-41b0-b9d7-d91c3b940dfc",
  "e273ee63-a70e-4da7-a2a9-277f58124145",
  "d4890d52-bb89-492e-8573-8678dea2ce09",
  "366e9f2f-db91-475f-8257-9880e4802cb1",
  "ead3bfcd-4d51-465a-862b-1431e4828258",
  "d14a1c78-d72f-4a82-b17e-6c4314237ab8",
  "b24f0c59-fba6-44be-b3ca-f80a4a2af13e",
  "616f4fc2-8ad7-486c-9c38-b629a56180a0",
  "0378bd59-e074-474e-b1a5-b53984dc7d9f",
  "ecc7517c-b20f-41d1-97c6-6d59b8348e93",
  "f8703761-0f95-4194-bba3-6b79e46608eb",
  "2cbb4ef6-e4c5-489a-8485-0d5387bd0de4",
  "e707d9e5-337e-4d34-9446-444a615b3c0c",
  "a2fea5b6-80f6-4824-a51a-d1228d33631f",
  "577b03eb-5c57-4adf-9049-4f47684240a8",
  "d8302571-027f-4168-a628-e462e0f82370",
  "3cf4f5cd-a929-487d-96fe-071c126e763e",
  "7fd40d15-550f-4d45-aa3e-3a35349b1ab0",
  "4f6f633d-c725-4349-8475-89b9f73e5ba8",
  "8616db80-f584-4fc9-8c9b-b07b54be14ab",
  "53a438a4-0cdc-4cdd-be7e-d70536812f9c",
  "8a3c5300-836b-496f-8a3e-989632dc2621",
  "4eb1417f-cd25-40e4-a8ab-460474731588",
  "bd784f05-4c51-438b-b5e4-e9eca96ba814",
  "1e076fd3-e86f-4975-98eb-b11a0a4a4dfb",
  "f737efca-ec3c-40f4-a709-4fba68076203",
  "26e2286c-004a-413b-ba6b-1f343ebdc1e5",
  "d27e90c7-2206-49e1-8fb0-52153b0de6bf",
  "6200781a-b69f-488e-89c5-17a81625d336",
  "25825efd-833f-4f94-8405-bd24c76ada69",
  "a3e3af5e-8e1f-4191-8cb2-e1d34a7c5eea",
  "a8ea22a6-c128-4dd1-86aa-ff23e304f5fb",
  "724b4bc8-1cae-4675-b9f1-102c1d6d612c",
  "69da6263-0733-40c8-9444-11cfc7e601e7",
  "3100afc4-74e4-447f-b90c-89022d3d90d0",
  "8d43c715-1159-4a41-8643-171c361b566c",
  "c04f4ebc-ace7-4e4e-93c2-0783367c0528",
  "6720fd46-2c83-4c4b-a9f3-d25106c72161",
  "6d062f57-a04b-4de1-b19a-981604f3487e",
  "fd4b6579-31e7-4258-a6e6-9edf59dd3b5d",
  "dfe10741-949c-4cfa-9c76-e6ce2f5f15e5"
];

const images = imageUuids.map((uuid, index) => ({
  id: `image_${index + 1}`,
  image: {
    uuid,
    contentRating: "safe",
    width: 774,
    height: 773,
    blurHash: "U8AvLg$+~CRj%NR*I:R*xbs:M{j@=|R*axWp"
  },
  accessPermission: "public",
  isAd: false
}));

export const sampleProfile: Profile = {
  id: "7667",
  uuid: "2cb7cebf-8ec9-439c-85e0-0cb8f81e8cec",
  displayName: "Dexy",
  username: "dexy",
  roles: ["supporter_vip"],
  age: 23,
  dateOfBirth: "2002-05-15",
  profileImage: {
    id: "2379391",
    image: {
      uuid: "dfe10741-949c-4cfa-9c76-e6ce2f5f15e5",
      contentRating: "safe",
      width: 300,
      height: 300,
      blurHash: "U8AI_UNG~B$*?HjZNabbkDj[ELR*-VbHxEWB"
    },
    accessPermission: "public",
    isAd: false
  },
  location: {
    type: "gps",
    homePlace: {
      region: "Salzburg",
      country: "Austria",
      countryCode: "AT"
    },
    place: {
      region: "Salzburg",
      country: "Austria",
      countryCode: "AT"
    }
  },
  images,
  bio: {
    biography: "🐶🦴🐉 〜 That one orange dog with Horns\nWhere them husky musky men at?\n\n━━━━━━━━━━━━━━\n𝗠𝗮𝗶𝗻:\n 🎈 23｜📍 Austria｜😏 Single and looking\n 🐶 Shep × Bernese × Dragon｜↔️ Ambivert",
    genders: ["Male"],
    languages: ["bs", "en", "de"],
    relationshipStatus: "single"
  },
  socialAccounts: [
    {
      id: "7667000000",
      socialNetwork: "twitter",
      isVerified: false,
      url: "https://twitter.com/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "@DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000001",
      socialNetwork: "instagram",
      isVerified: false,
      url: "https://www.instagram.com/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000002",
      socialNetwork: "telegram",
      isVerified: false,
      url: "https://t.me/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000003",
      socialNetwork: "discord",
      isVerified: false,
      url: "https://discordapp.com/users/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000004",
      socialNetwork: "steam",
      isVerified: false,
      url: "https://steamcommunity.com/id/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000005",
      socialNetwork: "bluesky",
      isVerified: false,
      url: "https://bsky.app/profile/dexy.dog",
      displayName: "dexy.dog",
      value: "@dexy.dog",
      accessPermission: "public"
    },
    {
      id: "7667000006",
      socialNetwork: "lastfm",
      isVerified: false,
      url: "https://www.last.fm/user/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    },
    {
      id: "7667000007",
      socialNetwork: "reddit",
      isVerified: false,
      url: "https://www.reddit.com/user/2002MK/",
      displayName: "2002MK",
      value: "u/2002MK",
      accessPermission: "public"
    },
    {
      id: "7667000008",
      socialNetwork: "barq",
      isVerified: false,
      url: "https://barq.app/@dexy",
      displayName: "dexy",
      value: "@dexy",
      accessPermission: "public"
    },
    {
      id: "7667000009",
      socialNetwork: "github",
      isVerified: false,
      url: "https://github.com/DexyThePuppy",
      displayName: "DexyThePuppy",
      value: "DexyThePuppy",
      accessPermission: "public"
    }
  ]
};
