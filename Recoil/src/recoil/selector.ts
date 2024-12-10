import { selector } from "recoil";
import { countState } from "./atom";

export const doubleCountState = selector<number>({
  key: 'doubleCount',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  }
})