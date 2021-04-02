import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // remember the latet callback.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback]);
  
    // set up the interval.
    useEffect(() => {
      let id = setInterval( () => {
        savedCallback.current()
      }, [delay])
      return () => clearInterval(id)
    }, [delay]);
}

export default useInterval