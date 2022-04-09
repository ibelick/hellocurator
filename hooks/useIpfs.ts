import { create } from "ipfs-http-client";
import { ImportCandidate } from "ipfs-core-types/src/utils";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const useIpfs = () => {
  const upload = async (file: ImportCandidate) => {
    try {
      const added = await client.add(file);
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

      return { url: ipfsUrl, hash: added.path };
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return {
    upload,
  };
};

export default useIpfs;
