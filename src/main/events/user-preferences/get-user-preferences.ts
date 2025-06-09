import { decrypt } from "@main/services/crypto";
import { registerEvent } from "../register-event";
import { db, levelKeys } from "@main/level";
import type { UserPreferences } from "@types";

const getUserPreferences = async () =>

  db
    .get<string, UserPreferences | null>(levelKeys.userPreferences, {
      valueEncoding: "json",
    })
    .then((userPreferences) => {
      if (userPreferences?.realDebridApiToken) {
  userPreferences.realDebridApiToken = decrypt(
    userPreferences.realDebridApiToken
  );
}

if (userPreferences?.allDebridApiKey) {
  userPreferences.allDebridApiKey = decrypt(
    userPreferences.allDebridApiKey
  );
}

if (userPreferences?.torBoxApiToken) {
  userPreferences.torBoxApiToken = decrypt(
    userPreferences.torBoxApiToken
  );
}


      return userPreferences;
    });

registerEvent("getUserPreferences", getUserPreferences);
