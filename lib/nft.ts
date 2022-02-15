export const getItemById = async (itemId: string) => {
  const response = await fetch(`https://api.rarible.org/v0.1/items/${itemId}`, {
    method: "GET",
  });
  const nft = await response.json();

  return nft;
};

// @todo: need API key from OpenSea to use it and retrieve severals NFTs in one request.
export const getItemByIds = async () => {
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
  const nfts = await response.json();

  return nfts;
};
