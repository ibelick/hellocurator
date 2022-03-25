export const WHITELISTED_STOREFRONTS = ["loopclub.eth"];

export const EVENT_INIT = [
  {
    creator_id: "loopclub.eth",
    creator_name: "LOOP CLUB",
    event_name: "Share the last photo you took",
    event_id: "share-photo-took",
  },
];

export const SPACE_INIT = EVENT_INIT.find(
  (event) => event.creator_id === WHITELISTED_STOREFRONTS[0]
);
