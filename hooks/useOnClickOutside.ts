import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

type Props = {
  ref: RefObject<HTMLElement>;
  callback: Dispatch<SetStateAction<boolean>>;
};

function useOnClickOutside({ ref, callback }: Props) {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Element)) {
      callback(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
    };
  }, []);
}

export default useOnClickOutside;
