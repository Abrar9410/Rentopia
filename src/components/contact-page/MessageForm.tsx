"use client"

import emailjs from '@emailjs/browser';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Send } from 'lucide-react';



const MessageForm = () => {

    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        // Send the whole form data
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID as string,   // Your EmailJS service ID (e.g., Gmail)
                process.env.NEXT_PUBLIC_TEMPLATE_ID as string,  // Your EmailJS template ID
                e.target as HTMLFormElement,                                // The form itself
                { publicKey: process.env.NEXT_PUBLIC_USER_ID }       // Your EmailJS user ID (provided in your account)
            )
            .then(
                () => {
                    toast.success('Email sent successfully!');
                    (e.target as HTMLFormElement).reset(); // Reset the form after submission
                    setSubmitting(false);
                },
                (error) => {
                    toast.error(`${error.text}`);
                    setSubmitting(false);
                }
            );
    };

    return (
        <div className="p-6 space-y-6">
            <p className="w-max font-semibold text-lg sm:text-xl lg:text-2xl">Send Message</p>
            <form onSubmit={handleSubmit} className="space-y-3 w-full">
                <div className='w-full'>
                    <Input
                        type="text"
                        placeholder="Your Name"
                        name="userName"  // This is used by EmailJS to map to {{userName}} in the template
                        required
                    />
                </div>
                <div className='w-full'>
                    <Input
                        type="email"
                        placeholder="Your Email"
                        name="userEmail"  // This is used by EmailJS to map to {{userEmail}} in the template
                        required
                    />
                </div>
                <div className='w-full'>
                    <Textarea
                        placeholder="Message"
                        name="message"  // This is used by EmailJS to map to {{message}} in the template
                        className='min-h-[120px]'
                        required
                    />
                </div>
                <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-base hover:bg-foreground hover:text-primary"
                >
                    {
                        submitting ?
                            <span className="w-3 h-3 border-2 animate-spin flex items-center justify-center border-y-foreground dark:border-y-background border-x-background dark:border-x-foreground rounded-full"></span> :
                            <span className="flex justify-center items-center gap-1">
                                Send Message
                                <Send />
                            </span>
                    }
                </Button>
            </form>
        </div>
    );
};

export default MessageForm;