import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const res = await axios.get(`http://localhost:3005/users?email=${email}`);
      if (!res.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };

  return {
    enteredEmail,
    emailAvailabilityStatus,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
