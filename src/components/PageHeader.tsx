

const PageHeader = ({title, subtitle}: {title: string, subtitle: string}) => {
    return (
        <div className="max-w-xl mx-auto space-y-2 md:space-y-3 mb-11 sm:mb-12 md:mb-13 lg:mb-14">
            <h1 className="text-primary text-center text-2xl sm:text-3xl md:text-4xl font-bold">
                {title}
            </h1>
            <p className="text-center text-muted-foreground max-sm:text-sm">
                {subtitle}
            </p>
        </div>
    );
};

export default PageHeader;