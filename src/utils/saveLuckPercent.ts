import { debounceAsync } from "./debounce";
import { getUserData } from "./getUserData";
import { saveUserData } from "./saveUserData";

async function saveLuckValue(attempts: number, correctGuesses: number): Promise<void> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const formattedValue = JSON.stringify({ attempts, correctGuesses });

    const currentData = await getUserData(formattedDate);
    if (currentData) {
        console.log(`Current data for ${formattedDate}:`, currentData);
    }

    await saveUserData(formattedDate, formattedValue);
}

export const safeSaveLuckValue = debounceAsync(saveLuckValue, 3000);

