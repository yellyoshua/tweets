import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const attachCycle = (day) => {
  return day
  .set("hour", 7)
  .set("minute", 0)
  .set("second", 0);
}

const getNextCycle = (nextCycle = attachCycle(dayjs())) => {
  if (dayjs(nextCycle).diff(dayjs(), "second") < 0) {
    return attachCycle(dayjs().add(1, "day"));
  }

  return nextCycle;
}

export default function CountDownComponent({className}) {
  // Each cycle runs each (24 hours) at 7am
  const [nextCycle, setNextCycle] = useState(getNextCycle());
  const [timeLeft, setTimeLeft] = useState('...');

  const getTimeLeft = useCallback(() => {
    const newNextCycle = getNextCycle(nextCycle);
    setNextCycle(newNextCycle);
    return dayjs(newNextCycle).from(dayjs(), true);
  }, [nextCycle]);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeLeft]);

  return (
    <p className={`${className} flex items-center`}>
      Next cycle in{" "}
      <span
        className="font-bold text-purple-500 bg-white px-1 my-1 rounded-sm mx-1 select-none"
      >
        {timeLeft}
      </span>
    </p>
  )
}
