import { Proposal } from "types/snapshot";
import Button from "components/Button";
import { useQuery } from "@apollo/client";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useVotingPower from "hooks/useVotingPower";
import ProposalGallery from "./ProposalGallery";
import Link from "next/link";
import { WHITELISTED_STOREFRONTS, SPACE_INIT } from "utils/storefront";
import { timeBetweenDates } from "utils/date";

const Event: React.FC = () => {
  return (
    <div className="pb-12">
      <Proposals />
    </div>
  );
};

const Proposals: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const {
    loading: isProposalsLoading,
    error,
    data,
  } = useQuery(SNAPSHOT_GET_PROPOSALS, {
    variables: {
      spaceIn: WHITELISTED_STOREFRONTS[0],
      state: "active",
    },
  });
  const [{ data: accountData }] = useAccount();
  const { userVotingPower } = useVotingPower();

  if (isProposalsLoading) return null;
  if (error) return <p>Error :(</p>;

  // @todo: filter with date ends + title + body IPFS
  const proposals = data.proposals.filter((proposal: Proposal) => {
    return proposal.title.startsWith("https://ipfs.infura.io/ipfs");
  });

  const isEventStarted = true;
  const isMintStarted = false;

  return (
    <div>
      <div className="mb-8 w-full rounded-xl border border-gray-100 bg-white py-8 px-8 shadow-xl transition   lg:px-12">
        <div className="mb-8 mt-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <span className="text-sm font-bold text-primary-800">
              1ST EDITION
            </span>
            <h1 className="text-2xl font-medium">{SPACE_INIT?.event_name}</h1>
            <p className="pb-4 text-gray-400">
              {SPACE_INIT?.event_description}
            </p>
          </div>
          <a
            href="https://mirror.xyz/hellocurator.eth/ejbQtqckavjt1aS7kScgXq8qkIMobov0kbT9P2eW9FE"
            target="_blank"
          >
            <Button variant="tertiary">How it works? →</Button>
          </a>
        </div>
        <div className="mt-4 mb-8 h-0.5 w-full bg-gray-50"></div>
        <ul className="justify-between lg:flex">
          <li className="border-r-1 mb-4 border-gray-100 lg:mb-0">
            <p className="text-sm text-gray-400">Ends in</p>
            <p className="text-xl">
              {isEventStarted
                ? `${timeBetweenDates(
                    new Date(SPACE_INIT?.date_end!),
                    new Date()
                  )}`
                : `-`}
            </p>
          </li>
          <li className="border-r-1 mb-4 border-gray-100 lg:mb-0">
            <p className="text-sm text-gray-400">Winner gets</p>
            <p className="text-xl ">
              {"95% of proceeds"}
              {isEventStarted ? null : `-`}
            </p>
          </li>
          <li className="border-r-1 mb-4  border-gray-100 lg:mb-0">
            <p className="text-sm text-gray-400">Submissions</p>
            <p className="text-xl">
              {isEventStarted ? `${proposals.length}` : `-`}
            </p>
          </li>
          <li className="border-r-1 mb-4  border-gray-100 lg:mb-0">
            <p className="text-sm text-gray-400">Voting power</p>
            <p className="text-xl ">
              1 vote<span className="text-xs"> per wallet</span>
              {isEventStarted ? null : `-`}
            </p>
          </li>
          <li>
            {isEventStarted ? (
              <Link href={`/events/${eventId}/create`}>
                <a>
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={!Boolean(accountData?.address)}
                  >
                    Submit an image
                  </Button>
                </a>
              </Link>
            ) : (
              <Button disabled>Opening soon</Button>
            )}
          </li>
        </ul>
      </div>
      {isMintStarted ? <MintItem /> : null}
      <div className="mb-4 flex-none items-center justify-between rounded-xl bg-gray-100 p-8 md:flex">
        <div className="flex items-center">
          <span>↑</span>
          <div className="ml-4">
            <h3 className="font-medium">Upvote the images you like the most</h3>
            <p className="text-gray-400">
              Most upvoted image will be put on sale at the end of the event
            </p>
          </div>
        </div>
        <div>
          <p className="mt-4 ml-8 md:ml-0 md:mt-0 ">
            Your voting power :{" "}
            {accountData ? (
              <span className="font-bold text-primary-800">
                1 wallet = 1 vote
              </span>
            ) : (
              <span className="font-bold text-primary-800">
                Connect your wallet
              </span>
            )}
          </p>
          <p className="ml-8 text-left text-sm text-gray-400 md:ml-0 lg:text-right">
            0.0001 ETH required to vote
          </p>
        </div>
      </div>
      <ProposalGallery
        proposals={proposals}
        userVotingPower={userVotingPower}
      />
    </div>
  );
};

const EventFinished = () => {
  return (
    <div className="mb-4 flex-none items-center justify-between rounded-xl bg-gray-50 p-8 md:flex">
      <div className="flex items-center">
        <span className="text-xl">🏆</span>
        <div className="ml-4">
          <h3 className="text-lg font-medium">Winner will be announced soon</h3>
          <p className="text-gray-400">
            You will soon be able to mint the winner image as an NFT
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400">Minting starts in</p>
        <p className="text-2xl font-medium">00:30:40</p>
      </div>
    </div>
  );
};

const MintItem = () => {
  return (
    <div className="mb-4 items-center lg:flex">
      <img
        src="https://images.unsplash.com/photo-1648042354854-b2890d803335?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8aFNQNkp4OHc0WjR8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
        className="mr-8  mb-4 w-full rounded-lg lg:mb-0 lg:w-2/4"
      />
      <div>
        <div className="mb-8 justify-between lg:flex">
          <div>
            <h1 className="text-2xl font-bold">SubjectMivity</h1>
            <p>
              Submitted by <span className="text-primary-800">ethan.eth</span>{" "}
            </p>
          </div>

          <div className="mt-4 lg:mt-0">
            <Button variant="secondary">Mint now</Button>
          </div>
        </div>
        <p>
          This commission is an exploration of the ways our past plays a role in
          the development of our psychological beings. Following the clues of
          involuntary memories, the project traces the line of my family’s
          emotional history that forms our personalities and informs our
          experience of the present.
        </p>
        <ul className="mt-8 lg:flex">
          <li className="border-r-1 mb-4 border-gray-100 lg:mb-0 ">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-2xl font-medium">0.01 ETH</p>
          </li>
          <li className="border-r-1 mb-4 border-gray-100 px-0 lg:mb-0 lg:px-12">
            <p className="text-sm text-gray-400">Already minted</p>
            <p className="text-2xl font-medium">149</p>
          </li>
          <li className="border-r-1 mb-4  border-gray-100 px-0 lg:mb-0 lg:px-12">
            <p className="text-sm text-gray-400">Minting ends in</p>
            <p className="text-2xl font-medium">00:00:30</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Event;
