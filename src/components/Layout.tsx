import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header className=" border-b border-gray-200 ">
                <div className="container h-16  flex items-center justify-between">
                    <Link to="/" className="text-2xl font-semibold hover:scale-105">
                        PhoneBook <span className="text-blue-500">Nimble</span>
                    </Link>

                    <span className="material-icons text-[36px]">account_circle</span>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            {/* <footer className="container">
                <p>Footer</p>
            </footer> */}
        </>
    );
};

export default Layout;
