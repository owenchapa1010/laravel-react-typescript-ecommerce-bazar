import Navbar from "@/Components/App/Navbar";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState, useEffect } from "react";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, success } = usePage().props;
    const user = auth.user;

    const [successMessages, setSuccessMessages] = useState<any[]>([]);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect((): void => {
        if (success) {
            setSuccessMessages((prev) => [...prev, success]);
        }
    }, [success]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
