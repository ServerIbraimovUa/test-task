import { useUpdateContactTagsMutation } from "../services/contacts";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagsFormSchema } from "../schemas/yup";

interface FormData {
    tags: string;
}

const TagForm = ({ contactId }: { contactId: string }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(tagsFormSchema) as Resolver<FormData>,
    });
    const [updateContactTags, { isLoading }] = useUpdateContactTagsMutation();

    const handleAddTags = (data: FormData) => {
        const tagsArray = data.tags
            .split(" ")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        updateContactTags({
            id: contactId,
            tags: tagsArray,
        }).unwrap();

        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleAddTags)} className="w-full flex flex-col gap-6">
            <label>
                <input
                    {...register("tags")}
                    type="text"
                    placeholder="Add new tag(s)"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 mt-4"
                />
            </label>
            <button
                type="submit"
                disabled={isLoading}
                className="h-[48px] border border-gray-600 rounded-[4px] text-[16px] font-medium hover:bg-gray-200"
            >
                Add Tag
            </button>
            {errors.tags && <p className="text-red-600">Failed to add tags. Please try again.</p>}
        </form>
    );
};

export default TagForm;
