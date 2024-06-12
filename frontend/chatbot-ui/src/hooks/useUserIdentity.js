import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useUserIdentity = () => {
  const userId = useRef(localStorage.getItem("userId") || uuidv4());
  const conversationId = useRef(
    localStorage.getItem("conversationId") || uuidv4()
  );

  console.log(
    "Initializing useUserIdentity with userId:",
    userId.current,
    "and conversationId:",
    conversationId.current
  );

  localStorage.setItem("userId", userId.current);
  localStorage.setItem("conversationId", conversationId.current);

  const resetIdentity = () => {
    userId.current = uuidv4();
    localStorage.setItem("userId", userId.current);
    conversationId.current = uuidv4();
    localStorage.setItem("conversationId", conversationId.current);
    console.log(
      "Identity reset to userId:",
      userId.current,
      "and conversationId:",
      conversationId.current
    );
  };

  return {
    userId: userId.current,
    conversationId: conversationId.current,
    resetIdentity,
  };
};

export default useUserIdentity;
