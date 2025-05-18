import z from 'zod'
import { ContentTypes } from '../model/Models'

export const userSignUpSchema=z.object({
    email:z.string().nonempty("Email Required").email("Must be a Email"),
    password:z.string().nonempty("Password Required").min(4,"Password is too short").max(8,"Password is too large"),
    name:z.string().nonempty("Name Required").max(100)
})
export const userSignInSchema=z.object({
    email:z.string().nonempty("Email Required").email("Must be a Email"),
    password:z.string().nonempty("Password Required"),
})



