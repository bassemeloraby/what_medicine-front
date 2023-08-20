export const mainPages = [
  {
    id: 1,
    url: "/medicine",
    text: "Medicine",

    ping: [
      { name: "search by trade name", link: "/medicine" },
      { name: "search by sientific name", link: "/AllScientificName" },
      { name: "medicine calculation", link: "/medCalc" },
      { name: "Food Supplement", link: "/foodSupplement" },
    ],
  },
  {
    id: 2,
    url: "/AllScientificName",
    text: "Cosmotic",

    ping: [{ name: "products", link: "/products" }],
  },
  {
    id: 3,
    url: "/projects",
    text: "Insurance",

    ping: [{ name: "insurance", link: "/insurance" }],
  },
];

export const proGroup = [
  {
    _id: 1,
    groupName: "Sensibio",
  },
  {
    _id: 2,
    groupName: "Autoderm",
  },
  {
    _id: 3,
    groupName: "Sebium",
  },
  {
    _id: 4,
    groupName: "Photoderm",
  },
  {
    _id: 5,
    groupName: "PigmentBio",
  },
  {
    _id: 6,
    groupName: "White Objective",
  },
  {
    _id: 7,
    groupName: "Hydrabio",
  },
  {
    _id: 8,
    groupName: "Secapio",
  },
  {
    _id: 9,
    groupName: "No D",
  },
  {
    _id: 10,
    groupName: "ABC Derm",
  },
  {
    _id: 11,
    groupName: "ABC Derm",
  },
];

export const categotyData = [
  { id: 1, name: "Sunscreen" },
  { id: 2, name: "Cleanser" },
  { id: 3, name: "Dry and Dehydrated Skin" },
  { id: 4, name: "Atopic" },{ id: 5, name: "HYPERPIGMENTED SKIN" },
];
