import { getSingleAvailableItem } from "@/actions/item";
import OrderForm from "@/components/order-page/OrderForm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Current_Status } from "@/types";
import Image from "next/image";



export const generateMetadata = async ({ params }: { params: Promise<{ itemId: string }> }) => {
    const { itemId } = await params;
    const { data: item } = await getSingleAvailableItem(itemId);

    return {
        title: `Order | ${item.title} | Rentopia` || "Not Found",
        description: `This page contains a form to place a rent order for the item: ${item.title}`
    };
};


const ItemOrderPage = async ({ params }: { params: Promise<{ itemId: string }> }) => {

    const { itemId } = await params;
    const { data: item } = await getSingleAvailableItem(itemId);

    const {
        title,
        images,
        category,
        pricePerDay,
        current_status,
        location,
        adv_bookings
    } = item;


    return (
        <div className="w-11/12 md:w-10/12 xl:w-9/12 mx-auto mt-8 grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="flex flex-col gap-4">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border">
                    <Image
                        src={images[0]}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    {images?.length > 1 && images.filter((image: string) => image !== images[0]).map((img: string) => (
                        <Image
                            key={img}
                            src={img}
                            alt={title}
                            width={1000}
                            height={1000}
                            className="w-28 h-24 object-cover rounded-lg border"
                        />
                    ))}
                </div>
            </div>

            {/* Info Section */}
            <div className="space-y-5">
                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{category}</Badge>
                    <Badge
                        className={cn(
                            { "bg-green-500": current_status === Current_Status.AVAILABLE },
                            { "bg-orange-500": current_status === Current_Status.OCCUPIED },
                        )}
                    >
                        {current_status}
                    </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold leading-tight">
                    {title}
                </h1>

                <div className="flex justify-between items-center">
                    {/* Location */}
                    <p className="text-muted-foreground">
                        📍 {location}
                    </p>

                    {/* Price */}
                    <div className="text-2xl font-semibold">
                        ৳ {pricePerDay}
                        <span className="text-base font-normal text-muted-foreground">
                            {" "} / day
                        </span>
                    </div>
                </div>

                <p className="text-center">
                    📅 Select your desired rental dates/duration below and place your order.
                </p>

                {/* Order Form */}
                <OrderForm itemId={itemId} pricePerDay={pricePerDay} advBookings={adv_bookings}/>
            </div>
        </div>
    );
};

export default ItemOrderPage;