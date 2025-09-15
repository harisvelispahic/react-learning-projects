import { use, useActionState, useOptimistic } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  // useOptimistic gives us a way to optimistically update the UI before the server confirms the change
  // It gives us back a temporary state and a function to update it
  // The function takes the current state and a mode (in our case "upvote" or "downvote") and returns the new state
  // This way, we can immediately reflect the vote change in the UI
  // Once the server responds, the actual state from the context will sync up
  // This improves user experience by making the app feel more responsive
  // without waiting for the server response to update the UI
  const [optimisticVotes, setOptimisticVotes] = useOptimistic(votes, (prevVotes, mode) =>
    mode === "upvote" ? prevVotes + 1 : prevVotes - 1
  );

  async function upvoteAction() {
    setOptimisticVotes("upvote");
    await upvoteOpinion(id);
  }
  async function downvoteAction() {
    setOptimisticVotes("downvote");
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
