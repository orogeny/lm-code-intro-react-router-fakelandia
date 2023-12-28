const MISDEMEANOURS = ["rudeness", "vegetables", "lift", "united"] as const;

const MISDEMEANOUR_OPTIONS = [
  { type: "lift", label: "Speaking in a Lift", emoji: "🗣" },
  { type: "rudeness", label: "Mild Public Rudeness", emoji: "🤪" },
  { type: "united", label: "Supporting Manchester United", emoji: "😈" },
  { type: "vegetables", label: "Not Eating Your Vegetables", emoji: "🥗" },
];

type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

const JUST_TALK = "just-talk";
type JustTalk = typeof JUST_TALK;

type MisdemeanourDto = {
  citizenId: number;
  misdemeanour: MisdemeanourKind;
  date: string; // we'll stringify this for easy sending via HTTP rather than storing the full Date object
};

type Misdemeanour = {
  id: string;
  type: MisdemeanourKind;
  citizenId: number;
  date: Date;
};

export {
  MISDEMEANOURS,
  MISDEMEANOUR_OPTIONS,
  JUST_TALK,
  type JustTalk,
  type Misdemeanour,
  type MisdemeanourDto,
  type MisdemeanourKind,
};
