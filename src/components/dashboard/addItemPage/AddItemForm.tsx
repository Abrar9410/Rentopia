"use client";

import { useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ImageUploader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addItem } from "@/actions/item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, UserRole } from "@/types";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";



const optionalImageSchema = z
    .instanceof(File)
    .refine(
        (file) =>
            ["image/png", "image/jpeg", "image/webp"].includes(file.type),
        "Only PNG, JPEG or WEBP images are allowed"
    )
    .optional()
    .nullable();


const addItemSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(3, "Overview must be at least 3 characters"),
    specifications: z.array(z.object({ value: z.string() })),
    image1: z
        .file("Image 1 is required!")
        .min(1, "Image is required")
        .mime(
            ["image/png", "image/jpeg", "image/webp"],
            "Only PNG, JPEG or WEBP images are allowed"
        ),
    image2: optionalImageSchema,
    image3: optionalImageSchema,
    image4: optionalImageSchema,
    category: z
        .enum(Object.values(Category) as ["", ...Category[]], "Please select the category for your item!")
        .optional()
        .refine((val) => val !== undefined, {
            message: "Please select the category for your item!",
        }),
    location: z.string().min(1, "Location is required!"),
    pricePerDay: z
        .string("Please mention the price!")
        .min(1, { message: "Amount must be valid and greater than 0" })
        .regex(/^\d+(\.\d{1,2})?$/, {
            message: "Enter a valid amount (up to 2 decimal places)",
        }),
    available: z.enum(["yes", "no"])
});

type ItemFormValues = z.infer<typeof addItemSchema>;

export default function AddItemForm() {

    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<ItemFormValues>({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
            title: "",
            description: "",
            specifications: [],
            category: "",
            pricePerDay: "",
            location: "",
            available: "yes"
        },
    });

    const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
        control: form.control,
        name: "specifications"
    });

    const onSubmit = async (data: ItemFormValues) => {
        setSubmitting(true);
        const { image1, specifications, pricePerDay, available, ...rest } = data;
        const toastId = toast.loading("Adding New Item...");

        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                ...rest,
                specifications: specifications[0]?.value === "" ? [] :
                    specifications.map((spec: { value: string }) => spec.value),
                pricePerDay: Number(pricePerDay),
                available: available === "yes" ? true : false
            })
        );

        const images: File[] = [];

        images.push(image1);

        if (rest.image2) images.push(rest.image2);
        if (rest.image3) images.push(rest.image3);
        if (rest.image4) images.push(rest.image4);

        images.forEach((image: File) => formData.append("files", image));

        try {
            const res = await addItem(formData);

            if (res.success) {
                toast.success(res.message, { id: toastId });
                form.reset();
                router.push(res.data.ownerRole === UserRole.ADMIN ? "/admin/dashboard/rentopia-items" : "/dashboard/my-items");
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch {
            // console.error(err);
            toast.error("An error occurred while adding this item", { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Item title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe your item" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator className="my-6"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Thumbnail */}
                    <FormField
                        control={form.control}
                        name="image1"
                        render={({ field }) => (
                            <FormItem className="min-w-64 max-w-md mx-auto">
                                <FormLabel className="w-max mx-auto">Image 1 (Thumbnail)</FormLabel>
                                <FormControl>
                                    <ImageUploader {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image2"
                        render={({ field }) => (
                            <FormItem className="min-w-64 max-w-md mx-auto">
                                <FormLabel className="w-max mx-auto">Image 2 (Optional)</FormLabel>
                                <FormControl>
                                    <ImageUploader {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image3"
                        render={({ field }) => (
                            <FormItem className="min-w-64 max-w-md mx-auto">
                                <FormLabel className="w-max mx-auto">Image 3 (Optional)</FormLabel>
                                <FormControl>
                                    <ImageUploader {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image4"
                        render={({ field }) => (
                            <FormItem className="min-w-64 max-w-md mx-auto">
                                <FormLabel className="w-max mx-auto">Image 4 (Optional)</FormLabel>
                                <FormControl>
                                    <ImageUploader {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator className="my-6" />

                {/* Specifications */}
                <div>
                    <div className="flex justify-between">
                        <FormLabel>Specifications</FormLabel>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => appendSpec({ value: "" })}
                        >
                            <Plus />
                        </Button>
                    </div>

                    <div className="space-y-4 mt-4">
                        {specFields.map((spec, index) => (
                            <div className="flex items-center gap-2" key={spec.id}>
                                <FormField
                                    control={form.control}
                                    name={`specifications.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    onClick={() => removeSpec(index)}
                                    variant="outline"
                                    className="text-lg"
                                    size="icon"
                                    type="button"
                                >
                                    ❌
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="min-w-64 max-w-md mx-auto">
                                <FormLabel className="w-max mx-auto">Category</FormLabel>
                                <FormControl>
                                    <Select value={field.value ?? undefined} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full cursor-pointer">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="*:cursor-pointer">
                                                {
                                                    Object.values(Category).map(category => (
                                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Price Per Day */}
                    <FormField
                        control={form.control}
                        name="pricePerDay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="w-max mx-auto">Price per day (BDT)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter amount"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d{0,2}$/.test(value)) {
                                                field.onChange(value);
                                            } else {
                                                field.onChange(field.value);
                                            };
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Location */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="Pick-up location/address for this item" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Make Available? */}
                <div className="flex justify-center">
                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Make available?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue="yes"
                                        className="flex flex-col"
                                    >
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="yes" className="cursor-pointer" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Yes
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="no" className="cursor-pointer" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                No
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                >
                    {submitting ? (
                        <span className="w-3 h-3 border-2 animate-spin border-y-foreground dark:border-y-background border-x-transparent rounded-full" />
                    ) : (
                        "Add Item"
                    )}
                </Button>
            </form>
        </Form>
    );
}
