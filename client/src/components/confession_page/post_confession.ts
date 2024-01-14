import { API_BASE_URL } from "../../environment_variables";
import { ConfessionFormData } from "./confession_form";

type ConfessionResponse = {
  success: boolean;
  justTalked: boolean;
  message: string;
};

async function postConfession(confession: ConfessionFormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/confess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confession),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const payload = (await response.json()) as ConfessionResponse;

    return payload;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to post confession");

    throw error;
  }
}

export { postConfession, type ConfessionResponse };
