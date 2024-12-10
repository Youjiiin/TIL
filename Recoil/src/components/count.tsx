import { useRecoilState, useRecoilValue } from "recoil";
import { countState } from "../recoil/atom";
import { doubleCountState } from "../recoil/selector";

const Count = () => {
  // // getter - 읽기만
  // const countValue = useRecoilValue(countState);

  // // setter - 변경만
  // const setCountValue = useSetRecoilState(countState);

  const [countValue, setCountValue] = useRecoilState(countState);
  
  const CounterWithSelector = () => {
    const doubleCount = useRecoilValue(doubleCountState);

    return doubleCount;
  }

  const countUp = function (step: number) {
    setCountValue((prev) => prev + step);
  };

  return (
    <>
      <p> {countValue} </p>
      <p> {CounterWithSelector()} </p>
      <button onClick={() => countUp(1)}>+1</button>
    </>
  );
};

export default Count;
