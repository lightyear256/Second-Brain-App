import { atom } from "recoil";
import axios from 'axios';

export const ShareAtom = atom<boolean>({
  key: "ShareAtom",
  default: localStorage.getItem("isShare") === "true",
})
