import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm } from "react-hook-form";
import { contactFormSchema } from "../schemas/yup";
import { useCreateContactMutation } from "../services/contacts"; // Импортируйте мутацию

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
}

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(contactFormSchema) as Resolver<FormData>,
    });

    // Используем мутацию для создания контакта
    const [createContact, { isLoading, isSuccess, isError }] = useCreateContactMutation();

    const handleFormData = async (data: FormData) => {
        try {
            await createContact({
                record_type: "person",
                privacy: {
                    edit: null,
                    read: null,
                },
                owner_id: null,
                fields: {
                    "first name": [{ value: data.first_name, modifier: "", label: "first name" }],
                    "last name": [{ value: data.last_name, modifier: "", label: "last name" }],
                    email: [{ value: data.email, modifier: "", label: "email" }],
                },
            }).unwrap();
            reset();
        } catch (error) {
            console.error("Failed to create contact:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormData)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-[12px]">
                <span>First Name</span>
                <input
                    className={`w-[280px] h-[48px] px-3 border rounded-lg ${
                        errors.first_name ? "border-red-500" : "border-gray-600"
                    }`}
                    type="text"
                    autoComplete="off"
                    {...register("first_name")}
                />
                {errors.first_name && (
                    <span className="text-red-500 text-sm">{errors.first_name.message}</span>
                )}
            </label>
            <label className="flex flex-col gap-1 text-[12px]">
                <span>Last Name</span>
                <input
                    className={`w-[280px] h-[48px] px-3 border rounded-lg ${
                        errors.last_name ? "border-red-500" : "border-gray-600"
                    }`}
                    type="text"
                    autoComplete="off"
                    {...register("last_name")}
                />
                {errors.last_name && (
                    <span className="text-red-500 text-sm">{errors.last_name.message}</span>
                )}
            </label>
            <label className="flex flex-col gap-1 text-[12px]">
                <span>Email</span>
                <input
                    className={`w-[280px] h-[48px] px-3 border rounded-lg ${
                        errors.email ? "border-red-500" : "border-gray-600"
                    }`}
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
            </label>

            <button
                type="submit"
                className="h-[48px] border border-gray-600 rounded-[4px] text-[16px] font-medium hover:bg-gray-200"
                disabled={isLoading}
            >
                {isLoading ? "Creating..." : "Add Contact"}
            </button>

            {isSuccess && <p className="text-green-500">Contact created successfully!</p>}
            {isError && <p className="text-red-500">Failed to create contact.</p>}
        </form>
    );
};

export default ContactForm;
