import { create } from "ipfs-http-client";
import { ImportCandidate } from "ipfs-core-types/src/utils";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const useIpfs = () => {
  const upload = async (file: ImportCandidate) => {
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return {
    upload,
  };
};

export default useIpfs;
