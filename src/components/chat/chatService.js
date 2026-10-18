import { sites } from "../../core/data/hanoiHeritageSites.js";

const MOCK_DELAY = 650;

function findSite(message) {
  const lower = message.toLowerCase();
  return sites.find(
    (item) =>
      lower.includes(item.name.en.toLowerCase()) || lower.includes(item.id),
  );
}

/**
 * Chat provider boundary. Replace this mock implementation with an API-backed
 * provider without changing ChatWidget's state or rendering logic.
 */
export function sendChatMessage({ message, language = "en" }) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const lower = message.toLowerCase();
      const site = findSite(message);
      if (site) {
        resolve({
          isMock: true,
          text: `${site.name[language] || site.name.en} is a ${site.category.toLowerCase()} heritage site in ${site.district}. The audio guide takes about ${site.duration} minutes.`,
          site,
        });
        return;
      }
      if (lower.includes("map") || lower.includes("bản đồ")) {
        resolve({
          isMock: true,
          text: "You can explore all nine heritage sites on the Interactive Map, filter by category and see distances when GPS is enabled.",
          links: [{ to: "/map", label: "Open interactive map" }],
        });
        return;
      }
      if (
        lower.includes("audio") ||
        lower.includes("guide") ||
        lower.includes("thuyết minh")
      ) {
        resolve({
          isMock: true,
          text: "Choose a location and press Play to start its multilingual audio guide. You can change language, speed and volume in the player.",
          links: [{ to: "/explore", label: "Browse heritage sites" }],
        });
        return;
      }
      resolve({
        isMock: true,
        text: "I can help you discover Hanoi heritage sites, audio guides, map routes and nearby landmarks. Try asking about Hoan Kiem Lake or the Temple of Literature.",
      });
    }, MOCK_DELAY);
  });
}

export const initialChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi. Ask me about Hanoi heritage, audio guides or the map.",
  isMock: true,
};
