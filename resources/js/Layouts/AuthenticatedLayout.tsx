import Navbar from "@/Components/App/Navbar";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState, useEffect } from "react";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const props = usePage().props;
    const user = props.auth.user;
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

            {props.error && (
                <div className="container mx-auto px-4 mt-8">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-.01-12a9 9 0 100 18 9 9 0 000-18z"
                            />
                        </svg>
                        <span className="text-sm font-medium">
                            {props.error}
                        </span>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
