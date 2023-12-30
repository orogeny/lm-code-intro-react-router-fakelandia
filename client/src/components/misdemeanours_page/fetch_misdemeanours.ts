import {
  Misdemeanour,
  MisdemeanourDto,
  fromDto,
} from "../../misdemeanours.types";
import { API_BASE_URL } from "../../environment_variables";

type MisdemeanoursResponse = {
  misdemeanours: MisdemeanourDto[];
};

async function fetchMisdemeanours(
  amount: number = 50
): Promise<Misdemeanour[]> {
  console.log("fetching misdemeanours");

  try {
    const path = `${API_BASE_URL}/misdemeanours/${amount}`;

    console.log(path);

    const response = await fetch(path);

    const data = (await response.json()) as MisdemeanoursResponse;

    return data.misdemeanours.map(fromDto);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("Failed to fetch misdemeanours");
    }
  }
}

export { fetchMisdemeanours };
