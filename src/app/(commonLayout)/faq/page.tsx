import FAQAccordion from "@/components/faq-page/FAQAccordion";
import PageHeader from "@/components/PageHeader";


const FAQPage = () => {
    return (
        <main className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto">
            <PageHeader
                className="mt-8"
                title="Frequently Asked Questions"
                subtitle=""
            />
            <FAQAccordion />
        </main>
    );
};

export default FAQPage;