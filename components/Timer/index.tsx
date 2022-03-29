import React, { useEffect, useState } from "react";
import { dynamicTimeLeft } from "utils/date";

interface TimerProps {
  dateEnd: Date;
}

const Timer: React.FC<TimerProps> = ({ dateEnd }) => {
  const [time, setTime] = useState<null | string>(null);

  useEffect(() => {
    if (!dateEnd) {
      return;
    }

    const intervalId = setInterval(function () {
      const now = new Date();
      const remainingTime = dynamicTimeLeft(now, dateEnd);

      setTime(remainingTime);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dateEnd]);

  return <span className="text-xl font-medium">{time}</span>;
};

export default Timer;
