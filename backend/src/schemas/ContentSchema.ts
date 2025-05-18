import { z } from "zod"
import { ContentTypes } from '../model/Models';
export const contentSchema=z.object({
    link:z.string().nonempty("Link Required"),
    type:z.enum(ContentTypes, { errorMap: () => ({ message: "Type Required" }) }),
    title:z.string().nonempty("Title Required"),
    // share:z.boolean()
    // tags:z.array(z.string()),
})