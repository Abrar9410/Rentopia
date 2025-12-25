import AddItemForm from "@/components/dashboard/addItemPage/AddItemForm";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Add Item | Rentopia",
    description: "Add Item page with a form to add item for giving on rent."
};


const AddItemPage = () => {
    return (
        <>
            <PageHeader title="Add Item" subtitle="Fill up the form with Item details" />
            <AddItemForm />
        </>
    );
};

export default AddItemPage;