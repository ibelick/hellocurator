import { castVote } from "lib/snapshot";

const Proposals: React.FC<any> = ({ proposals }) => {
  return (
    <div>
      <ul>
        {proposals?.map((proposal: any) => {
          return (
            <li key={proposal.id}>
              {proposal.id}-{" "}
              {proposal.choices.map((choice: any, index: number) => {
                return (
                  <span
                    key={`${index}-${choice}`}
                    onClick={() => castVote(proposal.id, index + 1)}
                  >
                    {choice} -{" "}
                  </span>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Proposals;
