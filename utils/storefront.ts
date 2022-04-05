export const WHITELISTED_STOREFRONTS = ["hellocurator.eth"];

export const EVENT_INIT = [
  {
    creator_id: "hellocurator.eth",
    creator_name: "hellocurator",
    event_name: "What is in front of you right now?",
    event_description:
      "Take a picture of what is in front of you. Don't cheat!",
    event_id: "photo-front-of-you",
    // date_end: null,
    date_end: 1650034800000,
  },
];

export const SPACE_INIT = EVENT_INIT.find(
  (event) => event.creator_id === WHITELISTED_STOREFRONTS[0]
);
