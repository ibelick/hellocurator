import Link from "next/link";
import DialogSubmitImage from "./DialogSubmitImage";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Button from "components/Button";

export interface SpaceInfo {
  id: string;
  name: string;
}

interface HeaderStorefrontProps {
  info: SpaceInfo;
  setCreateProposalReceiptId?: (createProposalReceiptId: string) => void;
}

const HeaderStorefront: React.FC<HeaderStorefrontProps> = ({
  info,
  setCreateProposalReceiptId,
}) => {
  const router = useRouter();
  const { uid } = router.query;
  const linkSelectedCn = `font-bold text-primary-800 underline decoration-primary-800 decoration-2 decoration-4 underline-offset-4`;
  const [{ data: accountData }] = useAccount();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl  font-bold text-black">
            <Link href={`/${uid}`}>
              <a>{info.name}</a>
            </Link>
          </h1>
          <h2 className="text-base text-gray-400">{info.id}</h2>
        </div>
        <div className="flex items-center">
          <Link href={`/${uid}/create`}>
            <a>
              <Button type="button" disabled={!Boolean(accountData?.address)}>
                Submit an image
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="mb-4 flex w-full justify-center">
        <Link href={`/${uid}`}>
          <a
            className={`mr-8 ${
              router.pathname === "/[uid]"
                ? linkSelectedCn
                : `underline decoration-transparent decoration-4 underline-offset-2`
            }`}
          >
            Gallery
          </a>
        </Link>
        <Link href={`/${uid}/vote`}>
          <a
            className={`${
              router.pathname === "/[uid]/vote"
                ? linkSelectedCn
                : `underline decoration-transparent decoration-4 underline-offset-2`
            }`}
          >
            Vote
          </a>
        </Link>
      </div>
    </>
  );
};

export default HeaderStorefront;
