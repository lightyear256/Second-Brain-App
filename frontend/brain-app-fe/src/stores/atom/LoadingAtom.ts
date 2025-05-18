import { atomFamily } from "recoil";

export const LoadingAtom=atomFamily<boolean,string>({
    key:"Loading",
    default:false
})