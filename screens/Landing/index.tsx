import Link from "next/link";
import Button from "components/Button";
import { useState } from "react";
import { Space } from "types/snapshot";
import Dialog from "components/Dialog";
import { EVENT_INIT } from "utils/storefront";
import { timeBetweenDates } from "utils/date";

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
          <p className="text-gray-400">Explore live events on hellocurator</p>
        </div>
        <DialogCreateSpace />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 mr-0 md:mb-0 md:mr-4">
          {EVENT_INIT.map((event) => {
            return (
              <CardSpace
                key={`${event.creator_id}-${event.event_id}`}
                href={`/events/${event.event_id}`}
                name={event.event_name}
                id={spaces.space.id}
                isSoon={Boolean(!event.date_end)}
                dateEnd={event.date_end}
                imgSrc="https://images.unsplash.com/photo-1647682619185-92b42eaec8d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
              />
            );
          })}
        </div>
      </div>
      <div className="mt-8 h-0.5 w-full bg-gray-100"></div>
      <div className="mt-8 rounded-xl bg-gray-100 p-10">
        <div>
          <h2 className="mb-2 text-xl font-bold">
            What is an event on hellocurator?
          </h2>
          <p className="mb-4 text-gray-400">
            A curation event is a period of 24hrs or more where people can
            submit content following a theme set by the creators of the event.
            During this time, a community can vote on the submitted content. The
            content with the most votes at the end of the period is then sold as
            an NFT to the public. Funds from the sale are distributed
            accordingly to the wishes of the curation event’s creators.
          </p>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <a
            href="https://mirror.xyz/hellocurator.eth/ejbQtqckavjt1aS7kScgXq8qkIMobov0kbT9P2eW9FE"
            rel="noopener noreferrer"
            className="mb-4 mr-2 sm:mb-0"
          >
            <Button variant="tertiary">Read mirror</Button>
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
  dateEnd: number | null;
}

const CardSpace: React.FC<CardSpaceProps> = ({
  href,
  name,
  id,
  imgSrc,
  isSoon,
  dateEnd,
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
            <h3 className="text-mb-1 mt-6 text-xl font-bold">{name}</h3>
            <p className="text-gray-400">by {id}</p>
            <div className="mt-4 h-0.5 w-full bg-gray-100"></div>
            <p className="mt-6 text-sm text-gray-400">Ends in</p>
            <p className="mb-8 text-xl font-medium">
              {!isSoon && dateEnd
                ? `${timeBetweenDates(new Date(dateEnd), new Date())}`
                : `-`}
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
      trigger={<Button>Create Event</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="text-center">
        <span className="text-4xl">🦖</span>
        <h2 className="mt-4 text-lg font-bold text-black">
          Want to launch an event on Hellocurator? Join our Discord
        </h2>
        <p className="mt-2">
          We are looking to partner with existing communities to launch new
          events on hellocurator. Whether you’re a DAO, a PFP-based NFTs
          community, or another project. If you like what we are building and
          want to launch an event with us, please shoot us a DM on Twitter at
          @hellocurator
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
