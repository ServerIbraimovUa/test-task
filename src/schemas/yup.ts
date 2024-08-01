import * as yup from "yup";

export const contactFormSchema = yup.object({
    first_name: yup.string().min(4).max(16).required(),
    last_name: yup.string().min(4).max(16).required(),
    email: yup.string().email().required(),
});
export const tagsFormSchema = yup.object({
    tags: yup.string().required(),
});
