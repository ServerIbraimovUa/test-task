import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const ContactsPage = () => {
    return (
        <section className="py-7 tablet:py-8 desktop:py-10">
            <div className="container flex flex-col items-center tablet:flex-row gap-9 tablet:items-start">
                <div className="tablet:sticky tablet:top-4">
                    <h2 className="text-xl font-medium mb-2">Create Contact</h2>
                    <ContactForm />
                </div>

                <div className="w-full max-w-[380px] tablet:w-full tablet:max-w-none">
                    <h2 className="text-xl font-medium mb-2">Contacts</h2>
                    <ContactList />
                </div>
            </div>
        </section>
    );
};

export default ContactsPage;
