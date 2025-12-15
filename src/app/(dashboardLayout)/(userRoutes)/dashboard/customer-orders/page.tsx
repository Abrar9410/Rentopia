import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Customer Orders | Rentopia",
    description: "This page contains the information of customer orders for current user's items."
};


const CustomerOrdersPage = () => {
    return (
        <div>
            ORDERS FOR YOUR ITEMS
        </div>
    );
};

export default CustomerOrdersPage;