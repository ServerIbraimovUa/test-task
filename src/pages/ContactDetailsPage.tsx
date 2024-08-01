import { useParams } from "react-router";

import ContactDetailsCard from "../components/ContactDetailsCard";
import { NavLink } from "react-router-dom";

const ContactDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <section className="pt-4">
            <div className="container ">
                <NavLink to="/" className="flex items-center gap-2 text-2xl mb-4">
                    <span className="material-icons">arrow_back</span> Back
                </NavLink>
                <ContactDetailsCard id={id || ""} />
            </div>
        </section>
    );
};

export default ContactDetailsPage;
