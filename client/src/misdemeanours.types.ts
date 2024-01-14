const MISDEMEANOURS = ["rudeness", "vegetables", "lift", "united"] as const;

const MISDEMEANOUR_OPTIONS = [
  { type: "rudeness", label: "Mild Public Rudeness", emoji: "🤪" },
  { type: "vegetables", label: "Not Eating Your Vegetables", emoji: "🥗" },
  { type: "lift", label: "Speaking in a Lift", emoji: "🗣" },
  { type: "united", label: "Supporting Manchester United", emoji: "😈" },
] as const;

type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

type MisdemeanourOption = (typeof MISDEMEANOUR_OPTIONS)[number];

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

function fromDto(dto: MisdemeanourDto): Misdemeanour {
  return {
    id: crypto.randomUUID(),
    type: dto.misdemeanour,
    citizenId: dto.citizenId,
    date: new Date(dto.date),
  };
}

export {
  JUST_TALK,
  MISDEMEANOURS,
  MISDEMEANOUR_OPTIONS,
  type JustTalk,
  type Misdemeanour,
  type MisdemeanourDto,
  type MisdemeanourKind,
  type MisdemeanourOption,
  fromDto,
};
