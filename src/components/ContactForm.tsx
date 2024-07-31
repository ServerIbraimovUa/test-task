import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { contactFormSchema } from "../schemas/yup";

interface FormData {
    first_name: string;
    last_name?: string;
    email: string;
}

const ContactForm = () => {
    const { register, handleSubmit, reset } = useForm<FormData>({
        resolver: yupResolver(contactFormSchema) as Resolver<FormData>,
    });

    const handleFormData = (data: FormData) => {
        console.log(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormData)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-[12px]">
                <span>First Name</span>
                <input
                    className="w-[280px] h-[48px] px-3 border border-gray-600 rounded-lg"
                    type="text"
                    autoComplete="off"
                    {...register("first_name", { required: true })}
                />
            </label>
            <label className="flex flex-col gap-1 text-[12px]">
                <span>Last Name</span>
                <input
                    className="w-[280px] h-[48px] px-3 border border-gray-600 rounded-lg"
                    type="text"
                    autoComplete="off"
                    {...register("last_name")}
                />
            </label>
            <label className="flex flex-col gap-1 text-[12px]">
                <span>Email</span>
                <input
                    className="w-[280px] h-[48px] px-3 border border-gray-600 rounded-lg"
                    type="text"
                    autoComplete="off"
                    {...register("email", { required: true })}
                />
            </label>

            <button className="h-[48px] border border-gray-600 rounded-[4px] text-[16px] font-medium font-poppins hover:bg-gray-200">
                Add Contact
            </button>
        </form>
    );
};

export default ContactForm;
