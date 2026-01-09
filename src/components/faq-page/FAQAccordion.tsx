import { ChevronDownIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const items = [
  {
    id: "1",
    title: "General",
    collapsibles: [
      {
        title: "What is Rentopia?",
        content:
          "Rentopia is a peer-to-peer rental marketplace where users can rent items from others or list their own items to earn money, all within Chittagong.",
      },
      {
        title: "Who can use Rentopia?",
        content:
          "Anyone in Chittagong can use Rentopia to rent items or list their own items for rent. Both renters and owners can use the same account.",
      },
      {
        title: "Is Rentopia free to use?",
        content:
          "Creating an account is completely free. Renters pay only the rental cost, while owners earn based on the price they set.",
      },
    ],
  },
  {
    id: "2",
    title: "Renting Items",
    collapsibles: [
      {
        title: "How do I rent an item?",
        content:
          "Browse available items, select your preferred rental dates, and complete payment. You then meet the owner to collect the item.",
      },
      {
        title: "Can I rent an item for just one day?",
        content:
          "Yes. Selecting a single date counts as a one-day rental.",
      },
      {
        title: "What if an item is not available on my selected dates?",
        content:
          "If the dates overlap with existing bookings, the item will be unavailable for those dates and cannot be booked.",
      },
    ],
  },
  {
    id: "3",
    title: "Listing & Earnings",
    collapsibles: [
      {
        title: "How do I list my item on Rentopia?",
        content:
          "You can list an item by providing its details, images, category, location, and daily rental price from your dashboard.",
      },
      {
        title: "How do I earn money as an owner?",
        content:
          "You earn money whenever someone rents your item. Payments are handled securely through the platform.",
      },
      {
        title: "Can I control when my item is available?",
        content:
          "Yes. Once an item is booked, the dates are automatically blocked to prevent double bookings.",
      },
    ],
  },
  {
    id: "4",
    title: "Payments & Safety",
    collapsibles: [
      {
        title: "How are payments handled?",
        content:
          "All payments are processed securely through the platform before the rental starts.",
      },
      {
        title: "What happens if a payment fails or is cancelled?",
        content:
          "If a payment fails or is cancelled, the booking is not confirmed and the dates are released for others to book if you do not complete the payment within 30 minutes of placing the order.",
      },
      {
        title: "Does Rentopia provide delivery?",
        content:
          "No. Rentopia does not provide delivery services currently. Owners and renters must meet in person to exchange items.",
      },
    ],
  },
];


export default function FAQAccordion() {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full -space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:underline focus-visible:ring-0 cursor-pointer">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {item.collapsibles.map((collapsible, index) => (
                <CollapsibleDemo
                  key={index}
                  title={collapsible.title}
                  content={collapsible.content}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CollapsibleDemo({
  title,
  content
}: {
  title: string
  content: string
}) {
  return (
    <Collapsible className="bg-accent border-t px-4 py-3">
      <CollapsibleTrigger className="flex gap-2 leading-6 font-semibold [&[data-state=open]>svg]:rotate-180 cursor-pointer">
        <ChevronDownIcon
          size={16}
          className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
          aria-hidden="true"
        />
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mt-1 overflow-hidden ps-6 text-sm transition-all">
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}
