import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const ContactsPage = () => {
    return (
        <section className="py-7 tablet:py-8 desktop:py-10">
            <div className="container flex flex-col tablet:flex-row items-center gap-9">
                <div>
                    <h2 className="text-xl font-medium mb-2">Create Contact</h2>
                    <ContactForm />
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-2">Contacts</h2>
                    <ContactList />
                </div>
            </div>
        </section>
    );
};

export default ContactsPage;
