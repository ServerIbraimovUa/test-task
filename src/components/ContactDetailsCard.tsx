import { useDeleteContactMutation, useGetContactByIdQuery } from "../services/contacts";
import { Contact } from "../components/ContactList";
import { useNavigate } from "react-router";
import TagForm from "./TagForm";

const ContactDetailsCard = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const { data, isLoading, isError } = useGetContactByIdQuery(id);

    const onDeleteContact = async () => {
        deleteContact(id)
            .unwrap()
            .then(() => {
                navigate("/");
            });
    };
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
        <>
            {data.resources.map((contact: Contact) => {
                const firstName = contact.fields["first name"]?.[0]?.value || "";
                const lastName = contact.fields["last name"]?.[0]?.value || "";
                const email = contact.fields.email?.[0]?.value || "N/A";
                const avatarUrl = contact.avatar_url;

                return (
                    <div key={contact.id}>
                        <div className="relative flex items-center gap-4 max-w-[430px] mx-auto mb-5">
                            <img
                                src={avatarUrl}
                                alt={`${firstName} ${lastName}`}
                                width={83}
                                height={83}
                                className="rounded-full h-[83px]"
                            />
                            <div className="font-medium text-base">
                                <p className="">
                                    {firstName} <span className="truncate">{lastName}</span>
                                </p>
                                <p className="  mb-3">{email}</p>
                            </div>
                            <button
                                onClick={onDeleteContact}
                                disabled={isDeleting}
                                className="absolute top-2 right-2 hover:text-red-500"
                            >
                                <span className="material-icons text-[26px]">highlight_off</span>
                            </button>
                        </div>
                        <div className=" w-[200px] tablet:w-auto max-w-[430px] mx-auto">
                            <p className="text-xl font-medium mb-3">Tags</p>
                            <div className="flex gap-2 flex-wrap mb-9">
                                {contact.tags?.map((el) => (
                                    <span
                                        key={el.id}
                                        className="flex justify-center items-center truncate h-[20px] w-[54px] bg-[#A6A6A6] rounded-[4px] text-[13px] font-medium"
                                    >
                                        {el.tag}
                                    </span>
                                ))}
                            </div>

                            <TagForm contactId={id} />
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ContactDetailsCard;
