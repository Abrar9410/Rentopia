import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Current_Status, IItem, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


interface IViewItemModalProps {
    item: IItem;
    children: React.ReactNode;
};


const ViewItemModal = ({ children, item }: IViewItemModalProps) => {

    const {
        title,
        description,
        images,
        specifications,
        category,
        current_status,
        owner,
        ownerRole,
        location,
        pricePerDay
    } = item;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className="mt-2 flex flex-wrap justify-between items-center">
                        <Badge variant="secondary">{category}</Badge>
                        <Badge
                            className={cn(
                                { "bg-green-500": current_status === Current_Status.AVAILABLE },
                                { "bg-orange-500": current_status === Current_Status.OCCUPIED },
                                { "bg-gray-500": current_status === Current_Status.UNDER_MAINTENANCE },
                                { "bg-yellow-500": current_status === Current_Status.FLAGGED },
                                { "bg-red-500": current_status === Current_Status.BLOCKED },
                            )}
                        >
                            {current_status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            ৳ {pricePerDay} / day
                        </span>
                    </DialogDescription>
                </DialogHeader>

                {/* Image */}
                <div className="mt-4">
                    <Image
                        src={images[0]}
                        alt={title}
                        width={1000}
                        height={1000}
                        className="w-full h-64 object-cover rounded-lg border"
                    />
                </div>
                <div className="mt-2 flex justify-center items-center gap-2">
                    {images?.length > 1 && images.filter((image: string) => image !== images[0]).map((img: string) => (
                        <Image
                            key={img}
                            src={img}
                            alt={title}
                            width={1000}
                            height={1000}
                            className="w-20 h-16 object-cover rounded-lg border"
                        />
                    ))}
                </div>

                {/* Description */}
                <div className="mt-6 space-y-2">
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                <Separator className="my-2" />

                {/* Specifications */}
                {specifications.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="font-medium">Specifications</h4>
                        {
                            specifications.map((spec: string) => (
                                <p key={spec} className="text-sm text-muted-foreground whitespace-pre-line">
                                    {spec}
                                </p>
                            ))
                        }
                        <Separator className="my-4" />
                    </div>
                )}


                {/* Meta Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <p className="text-muted-foreground">
                            {ownerRole === UserRole.ADMIN ? "Added By" : "Owner"}
                        </p>
                        <div className="flex flex-col justify-center gap-1">
                            <Image
                                src={owner.picture || "https://res.cloudinary.com"}
                                alt={owner.name.charAt(0)}
                                width={1000}
                                height={1000}
                                className="w-10 h-10 object-cover rounded-sm border"
                            />
                            <p className="font-medium">{owner.name}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Pickup Location</p>
                        <p className="font-medium">{location}</p>
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewItemModal;