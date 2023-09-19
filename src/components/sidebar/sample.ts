// type Gender =

let myName: string = "sanjay";
let age: number = 24;
let gender: "male" | "female" | "others" = "male";

interface Sibling {
  bro: number;
  sis: number | string;
  isMa?: boolean;
}

let siblings: Sibling[] = [
  {
    bro: 1,
    sis: 1,
    isMa: true,
  },
  {
    bro: 1,
    sis: 1,
  },
];
