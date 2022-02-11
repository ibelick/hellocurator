import type { NextPage } from "next";
import { apolloClient } from "lib/apollo";
import { SNAPSHOT_GET_PROPOSALS } from "lib/queries";
import { useEffect, useState } from "react";
import { createProposal } from "lib/snapshot";

const Home: NextPage = (props) => {
  const [NFTs, setNFTs] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNftsWithOpenSea = async () => {
      const params = new URLSearchParams({});

      setIsLoading(true);
      // const response = await fetch(
      //   `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20?token_ids=114202576718100464364515408500349303551825088591531595726314326089392594092033`,
      //   { method: "GET", headers: { Accept: "application/json" } }
      // );
      const response = await fetch(
        "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20",
        { method: "GET", headers: { Accept: "application/json" } }
      );

      const data = await response.json();
      setNFTs(data.items);
      setIsLoading(false);
    };

    // fetchNftsWithOpenSea();
  }, []);

  return (
    <main>
      <div>{isLoading ? <p>loading...</p> : <NFTGallery NFTs={NFTs} />}</div>
      <div>
        <SubmitNFT />
      </div>
    </main>
  );
};

const NFTGallery: React.FC<{ NFTs: any }> = ({ NFTs }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {NFTs?.map((NFT: any) => {
        return (
          <div className="overflow-hidden" key={NFT.id}>
            {NFT.meta?.content?.[0]["@type"] === "IMAGE" ? (
              <img src={NFT.meta?.content[0].url} alt={NFT.meta.name} />
            ) : null}
            <span>{NFT.meta.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const SubmitNFT = () => {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [nftId, setNftId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [NFT, setNFT] = useState<any>(null);

  const fetchNftsWithRarible = async () => {
    const params = `ETHEREUM:${contractAddress}:${nftId}`;

    setIsLoading(true);
    const response = await fetch(
      `https://api.rarible.org/v0.1/items/${params}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setNFT(data);
    setIsLoading(false);
  };

  https: return (
    <div>
      <label>CONTRACT ADDRESS</label>
      <input
        onChange={(e) => setContractAddress(e.target.value)}
        className="mb-3"
        type="text"
      />
      <label>NFT ID</label>
      <input
        onChange={(e) => setNftId(e.target.value)}
        className="mb-3"
        type="text"
      />
      <button onClick={fetchNftsWithRarible}>preview nft</button>
      <div>
        {NFT ? (
          <img
            className="h-full w-32"
            src={NFT.meta?.content[0].url}
            alt={NFT.meta.name}
          />
        ) : null}
      </div>
      <button onClick={() => createProposal(contractAddress!, nftId!)}>
        propose NFT
      </button>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: SNAPSHOT_GET_PROPOSALS,
  });

  return {
    props: {
      proposals: data.proposals,
    },
  };
}

export default Home;
