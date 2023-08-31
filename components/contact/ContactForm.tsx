"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rick } from "@/utils/contact";
import { sendMessage } from "@/server/contact";
import { useToast } from "@/components/ui/use-toast";
import { collabSchema, nonCollabSchema } from "@/utils/schemas/contact";
import type { IContactForm } from "@/types/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { prose } from "@/app/styles/prose";
import { cn } from "@/lib/utils";
type FormValues =
  | z.infer<typeof collabSchema>
  | z.infer<typeof nonCollabSchema>;

const validUrls = [
  "soundcloud.com",
  "on.soundcloud.com",
  "youtu.be",
  "www.youtube.com",
  "youtube.com",
  "open.spotify.com",
  "www.dropbox.com",
];

export const components: PortableTextComponents = {
  marks: {
    h1: ({ children }) => (
      <h1 className="text-2xl font-semibold">{children}</h1>
    ),

    li: ({ children }) => {
      return <li className="list-disc">{children}</li>;
    },
  },
};

const ContactForm = ({ content }: IContactForm) => {
  const { toast } = useToast();
  const [collabRequested, setCollabRequested] = useState(false);
  const [showValidUrls, setShowValidUrls] = useState(false);
  const [isRickRoll, setIsRickRoll] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      collabRequested ? (collabSchema as any) : (nonCollabSchema as any)
    ),
    defaultValues: {
      name: "",
      email: "",
      collabRequestUrl: "",
      subject: "",
      message: "",
    },
  });

  const { register } = form;

  const watchRickRoll = () => {
    const collabRequestUrl = form.watch("collabRequestUrl");
    if (
      collabRequestUrl &&
      rick.some((rickRoll) => collabRequestUrl.includes(rickRoll as string))
    ) {
      setIsRickRoll(true);
    }
  };

  useEffect(() => {
    watchRickRoll();
  }, [form.watch("collabRequestUrl")]);

  useEffect(() => {
    if (collabRequested) {
      form.register("collabRequestUrl");
    } else {
      form.unregister("collabRequestUrl");
    }
  }, [register, form, collabRequested]);

  function onSubmit(values: FormValues) {
    if (!collabRequested) {
      delete values.collabRequestUrl;
    }

    if (isRickRoll) {
      window.open(values.collabRequestUrl, "_blank");
      toast({
        title: "Success",
        description: "Oopsie, nice try! You got Rick Rolled!",
      });
      form.reset({
        name: "",
        email: "",
        collabRequestUrl: "",
        subject: "",
        message: "",
      });

      return;
    }

    sendMessage(values, toast)
      .then(() => {
        toast({
          title: "Success",
          description: "Message sent successfully!",
        });
        form.reset({
          name: "",
          email: "",
          collabRequestUrl: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="grid lg:grid-cols-2">
        <section className={cn("lg:mx-16 prose", prose)}>
          <PortableText value={content.text} />
        </section>

        <div className="flex justify-center my-8 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-96 font-montserrat text-black  "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white  "
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  onChange={() => {
                    setCollabRequested(!collabRequested);
                    setShowValidUrls(false);
                    form.reset({ ...form.getValues(), collabRequestUrl: "" });
                  }}
                />
                <Label
                  htmlFor="collab-request"
                  className="text-card-foreground"
                >
                  Collab Request
                </Label>
              </div>

              {collabRequested && (
                <FormField
                  control={form.control}
                  name="collabRequestUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-card-foreground">
                        Link to your production
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-white"
                          placeholder="https://soundcloud.com/yourname/yourtrack"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-card-foreground flex flex-col gap-y-2 ">
                        <section className="flex flex-row items-center">
                          <span>Please provide a link to your production.</span>
                          <Button
                            type="button"
                            className="bg-red-200 text-[#0f0f0f] hover:bg-green-600 h-8 rounded-xl text-sm mx-2 w-40"
                            onClick={() => setShowValidUrls(!showValidUrls)}
                          >
                            Valid urls
                          </Button>
                        </section>
                        {showValidUrls && (
                          <ul className="list-disc ml-10 text-card-foreground/60 space-y-2 text-base  ">
                            {validUrls.map((url, index) => (
                              <li key={index}>{url}</li>
                            ))}
                          </ul>
                        )}
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="john.doe@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Bookings etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-white h-40"
                        placeholder="Message..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                className="hover:bg-green-600 bg-white w-96 text-[#0f0f0f] "
                type="submit"
                onClick={() => {
                  setShowValidUrls(!showValidUrls);
                }}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
