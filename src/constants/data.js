import images from './images';

const wines = [
  {
    title: 'Avocado Bhel',
    price: '$56',
    tags: 'Ember Roasted Ponk | Green Apple | Tamarind',
  },
  {
    title: 'Cauliflower Koliwada',
    price: '$59',
    tags: 'Carrot Pachadi | Curry Leaf | Podi',
  },
  {
    title: 'Green Pea & Fav Kulcha',
    price: '$44',
    tags: 'Tomato Pachadi | Umbria Truffle',
  },
  {
    title: 'Pork Belly BBQ',
    price: '$31',
    tags: 'Pomegranate | Compressed Apple | Apricot | Mustard',
  },
  {
    title: 'Chicken Gustaba',
    price: '$26',
    tags: 'Amul Cheese Fondue | Perigord Truffle | Coriander',
  },
];

const cocktails = [
  {
    title: 'Aperol Sprtiz',
    price: '$20',
    tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
  },
  {
    title: "Dark 'N' Stormy",
    price: '$16',
    tags: 'Dark rum | Ginger beer | Slice of lime',
  },
  {
    title: 'Daiquiri',
    price: '$10',
    tags: 'Rum | Citrus juice | Sugar',
  },
  {
    title: 'Old Fashioned',
    price: '$31',
    tags: 'Bourbon | Brown sugar | Angostura Bitters',
  },
  {
    title: 'Negroni',
    price: '$26',
    tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
  },
];

const awards = [
  {
    imgUrl: images.award02,
    title: 'Bib Gourmond',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award01,
    title: 'Rising Star',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award05,
    title: 'AA Hospitality',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  {
    imgUrl: images.award03,
    title: 'Outstanding Chef',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
  },
];

export default { wines, cocktails, awards };
