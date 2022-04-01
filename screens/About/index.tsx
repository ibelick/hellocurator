const About = () => {
  return (
    <div className="m-auto max-w-3xl">
      <img src="/mirroCover.jpg" className="mb-4 w-full rounded-xl"></img>
      <h1 className="mb-4 mt-12 text-2xl font-medium">What is hellocurator?</h1>
      <p className="mb-8">
        A curation event is a period of 24hrs or more where people can submit
        content following a theme set by the creators of the event. During this
        time, a community can vote on the submitted content. The content with
        the most votes at the end of the period is then sold as an NFT to the
        public. Funds from the sale are distributed accordingly to the wishes of
        the curation event’s creators. On hellocurator, communities create their
        own space and launch curation events. We believe this will open up new
        ways to get community members together, raise funds, give utility to
        NFTs and more.
      </p>
      <div className="my-8 h-0.5 w-full bg-gray-100"></div>
      <h1 className="mb-8 text-2xl font-medium">How does it works?</h1>
      <h2 className="text-1xl mb-4 font-medium">1. Submission</h2>
      <p className="mb-8">
        When an event goes live, anyone can submit a file like an image, audio,
        or video fitting the theme. In order to submit, the user needs to give
        the image a title and a description. The image is then stored on IPFS.
        Once the image is successfully submitted, it is directly added to the
        voting section and becomes visible to everyone. Each image has its own
        page to make it easy for users to share around and get more votes!
      </p>
      <h2 className="text-1xl mb-4 font-medium">2. Voting</h2>
      <p className="mb-8">
        While anyone can submit an image, voting is reserved for holders/members
        of the project/DAO/NFT who created the event. Community members can vote
        for the best submissions using their tokens or NFTs. We are powered by
        Snapshot, a decentralized voting system. This allows us to utilize
        ‘off-chain' signing with zero fees. When you vote on hellocurator, you
        will never pay anything. After 24 hours, the image/video/etc. with the
        most votes gets minted on the platform.
      </p>
      <h2 className="text-1xl mb-4 font-medium">3. Mint and collecting</h2>
      <p className="mb-8">
        After the submission and voting periods end, the image that got the most
        votes can be minted by anyone for a limited period of time, at a fixed
        price. This is an opportunity to start collecting curated NFTs from
        various events and support a DAO or a specific cause. in the future,
        events creators will be able to choose between auctioning the winning
        image or minting it for a limited period of time.
      </p>
      <h2 className="text-1xl mb-4 font-medium">4. Revenue-sharing</h2>
      <p className="mb-8">
        Events creators have the option to determine how they want the revenue
        of the NFT sale to be shared. 100% of the proceeds could go to charity
        or revenue could be split between the event creator and the winner.
        Anything is possible.
      </p>
      <div className="my-8 h-0.5 w-full bg-gray-100"></div>
      <h1 className="mb-8 text-2xl font-medium">Team</h1>
      <div className="flex">
        <div className="mr-8 flex items-center">
          <img
            src="/ibelick.png"
            className="mb-4 mr-4 h-16 w-16 rounded-full"
          ></img>
          <div>
            <p className="font-medium">Ibelick</p>
            <a href="https://twitter.com/smoooogy" target="_blank">
              Twitter
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src="/smoogy.png"
            className="mb-4 mr-4 h-16 w-16 rounded-full"
          ></img>
          <div>
            <p className="font-medium">Smoogy</p>
            <a href="https://twitter.com/Ibelick" target="_blank">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
