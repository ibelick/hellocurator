import { useEffect, useState } from "react";

const NFTGallery: React.FC = () => {
  const [NFTs, setNFTs] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // @todo: need API key from OpenSea to use it and retrieve severals NFTs in one request.
    //        we gonna do it server side and mapping with response from snapshot
    const fetchNftsWithOpenSea = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.opensea.io/api/v1/assets?token_ids=%3Ftoken_ids%3D1%26token_ids%3D209&order_direction=desc&offset=0&limit=20",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "X-API-KEY": "API_KEY",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setNFTs(data.items);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    // fetchNftsWithOpenSea();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {!NFTs ? (
        <div>
          <p>
            no gallery yet <span>😢</span>
          </p>
        </div>
      ) : (
        NFTs?.map((NFT: any) => {
          return (
            <div className="overflow-hidden" key={NFT.id}>
              {NFT.meta?.content?.[0]["@type"] === "IMAGE" ? (
                <img src={NFT.meta?.content[0].url} alt={NFT.meta.name} />
              ) : null}
              <span>{NFT.meta.name}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default NFTGallery;
