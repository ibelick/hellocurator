export const WHITELISTED_STOREFRONTS = ["hellocurator.eth"];

export const EVENT_INIT = [
  {
    creator_id: "hellocurator.eth",
    creator_name: "hellocurator",
    event_name: "Hellocurator Photography Contest",
    event_description: "Enter by submitting one or more images",
    event_id: "photo-contest-1",
    // date_end: null,
    date_end: 1650549600000,
  },
];

export const SPACE_INIT = EVENT_INIT.find(
  (event) => event.creator_id === WHITELISTED_STOREFRONTS[0]
);
