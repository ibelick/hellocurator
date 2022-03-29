import Link from "next/link";
import Button from "components/Button";
import { useState } from "react";
import { Space } from "types/snapshot";
import Dialog from "components/Dialog";
import { EVENT_INIT } from "utils/storefront";

export interface LandingProps {
  spaces: Spaces;
}

interface Spaces {
  space: Space;
}

const DISCORD_LINK = "https://discord.com/invite/eT5hD56Brt";

const Landing: React.FC<LandingProps> = ({ spaces }) => {
  return (
    <div>
      <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
        <div className="mb-2 md:mb-0">
          <h2 className="text-xl font-bold">Events</h2>
          <p className="text-gray-400">Explore live and past events</p>
        </div>
        <DialogCreateSpace />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 mr-0 md:mb-0 md:mr-4">
          {EVENT_INIT.map((event) => {
            return (
              <CardSpace
                key={`${event.creator_id}-${event.event_id}`}
                href={`/${event.creator_id}/${event.event_id}`}
                name={event.event_name}
                id={spaces.space.id}
                isSoon={Boolean(!event.date_start)}
                imgSrc="https://images.unsplash.com/photo-1644799823986-6708ccdfa46f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=864&q=80"
              />
            );
          })}
        </div>
      </div>
      <div className="mt-8 h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8 rounded-xl bg-gray-100 p-10">
        <div>
          <h2 className="mb-2 text-xl font-bold">What is hellocurator?</h2>
          <p className="mb-4 text-gray-400">
            A curation event is 24h or more where people can submit an image
            responding to a given theme, community members can vote with crypto.
            Then, the most voted image gets minted or auctioned for a limited
            period of time. Funds from the sale are then distributed accordingly
            to what the community decided.
          </p>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <a
            // href="https://playgrounds.wtf/"
            // target="_blank"
            rel="noopener noreferrer"
            className="mb-4 mr-2 sm:mb-0"
          >
            <Button variant="tertiary" disabled>
              Read mirror
            </Button>
          </a>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="tertiary">Join Discord</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

interface CardSpaceProps {
  href: string;
  name: string;
  id: string;
  imgSrc: string;
  isSoon?: boolean;
}

const CardSpace: React.FC<CardSpaceProps> = ({
  href,
  name,
  id,
  imgSrc,
  isSoon,
}) => {
  return (
    <Link href={isSoon ? `/` : href}>
      <a className={`block ${isSoon ? `cursor-wait` : ``}`}>
        <div className="md:w-100 relative w-full rounded-xl border border-gray-200 bg-white shadow transition hover:bg-gray-100">
          {isSoon ? (
            <span className="absolute top-4 right-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-400">
              SOON
            </span>
          ) : (
            <span className="absolute top-6 right-6 rounded-full bg-green-50 px-4 py-2 text-green-500">
              Open
            </span>
          )}
          <img
            className="mb-4 h-28 w-full rounded-t-lg object-cover"
            src={imgSrc}
            alt={name}
          />
          <div className="px-8">
            <h3 className="text-mb-1 mt-8 text-xl font-bold">{name}</h3>
            <p className="text-gray-400">by {id}</p>
            <div className="mt-4 h-0.5 w-full bg-gray-100"></div>
            <p className="mt-6 text-sm text-gray-400">Ends in</p>
            <p className="mb-8 text-xl font-medium">
              {!isSoon ? `30 days` : `-`}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

const DialogCreateSpace = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      trigger={<Button>Create space</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="text-center">
        <span className="text-4xl">🦖</span>
        <h2 className="mt-4 text-lg font-bold text-black">
          Want to start a gallery? Join our Discord
        </h2>
        <p className="mt-2">
          We are currently building hellocurator as part of Playgrounds.wtf,
          join our Discord and #loopclub channel to engage with us!
        </p>
        <div className="mt-4 flex justify-center">
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button>Join Discord</Button>
          </a>
        </div>
      </div>
    </Dialog>
  );
};

export default Landing;
