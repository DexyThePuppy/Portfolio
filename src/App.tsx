import React from 'react';
import Profile from './components/Profile';

const App: React.FC = () => {
  const imageUrls = [
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
    "2cbb4ef6-e4c5-489a-8485-0d5387bd0de4",
    "f8703761-0f95-4194-bba3-6b79e46608eb",
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
    "a8ea22a6-c128-4dd1-86aa-ff23e304f5fb",
    "257f112a-f7be-4c80-8992-14fc0e6ea35c",
    "d9b2d763-54dc-41d4-b2d9-f87960f4d830",
    "e0aec27e-11ef-4756-a4e6-852706fd2a7b",
    "33261949-87a0-4714-82d8-d8b6327a7eb8",
    "84a67cc8-6861-4843-8c7a-d3d8875327d4",
    "b28e2af3-e87e-4fd9-ad9d-34cc2c658210",
    "e7a73559-8a62-483a-a68a-c0c7e707d764",
    "74c50532-e137-4b41-b969-ee58a46ebd25",
    "6f0028f2-05a8-4336-a5b9-bab273084985",
    "995e89a2-5b8e-47f8-88b0-97296c9f2478",
    "22ac6898-ecb0-4524-ad6b-1fc96eac2b84",
    "4b3d9a8b-05bd-4b72-8e4d-1c7d0bb86f58",
    "cf113d81-a62b-4931-b253-050b5b8607e7",
    "c3734f63-d60a-4364-87a5-a2be25e43c2c",
    "724b4bc8-1cae-4675-b9f1-102c1d6d612c",
    "69da6263-0733-40c8-9444-11cfc7e601e7",
    "3100afc4-74e4-447f-b90c-89022d3d90d0",
    "8d43c715-1159-4a41-8643-171c361b566c",
    "fd4b6579-31e7-4258-a6e6-9edf59dd3b5d",
    "c04f4ebc-ace7-4e4e-93c2-0783367c0528",
    "6720fd46-2c83-4c4b-a9f3-d25106c72161",
    "6d062f57-a04b-4de1-b19a-981604f3487e"
  ];

  const images = imageUrls.map((uuid, index) => ({
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

  const sonaImages = {
    puppy: [
      "257f112a-f7be-4c80-8992-14fc0e6ea35c",
      "d9b2d763-54dc-41d4-b2d9-f87960f4d830",
      "e0aec27e-11ef-4756-a4e6-852706fd2a7b",
      "33261949-87a0-4714-82d8-d8b6327a7eb8",
      "84a67cc8-6861-4843-8c7a-d3d8875327d4",
      "b28e2af3-e87e-4fd9-ad9d-34cc2c658210"
    ],
    otter: [
      "e7a73559-8a62-483a-a68a-c0c7e707d764",
      "74c50532-e137-4b41-b969-ee58a46ebd25",
      "6f0028f2-05a8-4336-a5b9-bab273084985",
      "995e89a2-5b8e-47f8-88b0-97296c9f2478",
      "22ac6898-ecb0-4524-ad6b-1fc96eac2b84",
      "4b3d9a8b-05bd-4b72-8e4d-1c7d0bb86f58",
      "cf113d81-a62b-4931-b253-050b5b8607e7",
      "c3734f63-d60a-4364-87a5-a2be25e43c2c"
    ]
  };

  const sampleData = {
    profile: {
      id: "7667",
      uuid: "2cb7cebf-8ec9-439c-85e0-0cb8f81e8cec",
      displayName: "Dexy",
      username: "dexy",
      roles: ["supporter_vip"],
      age: 22,
      dateOfBirth: "2002-05-15",
      profileImage: images[0],
      location: {
        type: "gps",
        homePlace: {
          place: "Bischofshofen",
          region: "Salzburg",
          country: "Austria",
          countryCode: "AT",
          longitude: 13.21944,
          latitude: 47.41722
        },
        place: {
          place: "Steyr",
          region: "Upper Austria",
          country: "Austria",
          countryCode: "AT",
          longitude: 14.41667,
          latitude: 48.05
        }
      },
      images,
      bio: {
        biography: "🐶🦴🐉 ~ That one orange dog with Horns\nAlso, Resonite ROCKS!\n\n🐶 Main: 🎈⛓\n🎈 22 |📍Austria & Germany | 🧬 He/Him\n🐶 Australian Shep & Bernese Mountain Dog-dragon hybrid mix\n🏳️‍🌈 Gay Derg Doggo | ↔️ Ambivert | ❤️Dating",
        genders: ["That one orange dog with horns"],
        languages: ["bs", "en", "de", "hr"],
        relationshipStatus: "dating"
      },
      socialAccounts: [
        {
          id: "7667000000",
          socialNetwork: "twitter",
          isVerified: true,
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
          socialNetwork: "discord",
          isVerified: false,
          url: "https://discordapp.com/users/DexyThePuppy",
          displayName: "DexyThePuppy",
          value: "DexyThePuppy",
          accessPermission: "public"
        }
      ],
      sonas: [
        {
          id: "588608",
          displayName: "Dexy",
          hasFursuit: false,
          species: {
            id: "1563",
            displayName: "Puppy"
          },
          images: sonaImages.puppy.map((uuid, index) => ({
            id: `puppy_${index + 1}`,
            image: {
              uuid,
              contentRating: "safe",
              width: 774,
              height: 773,
              blurHash: "U8AvLg$+~CRj%NR*I:R*xbs:M{j@=|R*axWp"
            },
            accessPermission: "public",
            isAd: false
          }))
        },
        {
          id: "588607",
          displayName: "Dexy",
          hasFursuit: false,
          species: {
            id: "9",
            displayName: "Otter"
          },
          images: sonaImages.otter.map((uuid, index) => ({
            id: `otter_${index + 1}`,
            image: {
              uuid,
              contentRating: "safe",
              width: 774,
              height: 773,
              blurHash: "U8AvLg$+~CRj%NR*I:R*xbs:M{j@=|R*axWp"
            },
            accessPermission: "public",
            isAd: false
          }))
        }
      ]
    }
  };

  return (
    <div className="App">
      <Profile {...sampleData} />
    </div>
  );
};

export default App; 