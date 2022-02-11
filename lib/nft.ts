export const getItemById = async (itemId: string) => {
  //   const itemId = `ETHEREUM:0xd07dc4262bcdbf85190c01c996b4c06a461d2430:330900`;

  const response = await fetch(`https://api.rarible.org/v0.1/items/${itemId}`, {
    method: "GET",
  });
  const nft = await response.json();

  return nft;
};
