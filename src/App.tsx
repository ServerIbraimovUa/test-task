import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import ContactsPage from "./pages/ContactsPage";
import ContactDetailsPage from "./pages/ContactDetailsPage";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<ContactsPage />} />
                    <Route path="/contact/:id" element={<ContactDetailsPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
