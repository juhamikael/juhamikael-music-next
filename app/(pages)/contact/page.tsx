import { FC } from "react";
import ContactForm from "@/components/contact/ContactForm";
import { cachedClient } from "@/sanity/lib/client";
import { contactForm } from "@/sanity/queries/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juha Mikael Music | Contact",
  description: "Contact Juha Mikael Music",
};

const ContactPage = async () => {
  const contactFormText = await cachedClient(contactForm);

  return <ContactForm content={contactFormText[0]} />;
};

export default ContactPage;
