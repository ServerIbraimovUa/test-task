import { Link } from "react-router-dom";
import { useDeleteContactMutation, useGetContactsQuery } from "../services/contacts";
const placeholder =
    "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
interface ContactFields {
    "first name": { value: string }[];
    "last name": { value: string }[];
    email: { value: string }[];
}

interface Contact {
    id: string;
    fields: ContactFields;
    avatar_url: string;
    tags: {
        id: string;
        tag: string;
    }[];
}

const ContactList = () => {
    const { data, isLoading, isError } = useGetContactsQuery({});
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    if (isError) {
        return <p className="text-red-500">Failed to load contacts.</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data || !data.resources || data.resources.length === 0) {
        return <p>No contacts available.</p>;
    }

    return (
        <ul className="flex flex-col gap-2">
            {data.resources.map((contact: Contact) => {
                const firstName = contact.fields["first name"]?.[0]?.value || "";
                const lastName = contact.fields["last name"]?.[0]?.value || "";
                const email = contact.fields.email?.[0]?.value || "N/A";
                const avatarUrl = contact.avatar_url || placeholder;

                return (
                    <li key={contact.id} className="relative  bg-[#EDEDED] rounded-[4px] ">
                        <Link
                            to={`/contact/${contact.id}`}
                            className="py-2 px-2 flex items-center gap-4"
                        >
                            <img
                                src={avatarUrl}
                                alt={`${firstName} ${lastName}`}
                                width={59}
                                height={59}
                                className="rounded-full h-[59px]"
                            />
                            <div className="font-medium text-base">
                                <p className="truncate w-[200px]">
                                    {firstName} <span className="truncate">{lastName}</span>
                                </p>
                                <p className="truncate w-[200px]  mb-3">{email}</p>

                                <div className="flex gap-2 flex-wrap w-[200px] tablet:w-auto">
                                    {contact.tags?.slice(0, 6).map((el) => (
                                        <span
                                            key={el.id}
                                            className="flex justify-center items-center truncate h-[20px] w-[54px] bg-[#A6A6A6] rounded-[4px] text-[13px] font-medium"
                                        >
                                            {el.tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>

                        <button
                            onClick={() => deleteContact(contact.id)}
                            disabled={isDeleting}
                            className="absolute top-2 right-2 hover:text-red-500"
                        >
                            <span className="material-icons text-[26px]">highlight_off</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default ContactList;
