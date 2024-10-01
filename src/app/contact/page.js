'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase"; 


const contactSchema = z.object({
  name: z.string().min(3, "Name is Required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });
  const { t } = useTranslation();

  
  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "feedbacks"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      setSuccessMessage("Form submitted successfully!");
      reset();
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">
          {t("contactPage.enquiryForm")}
        </h2>
        {/* Display image */}
       
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register("name")}
            placeholder={t("contactPage.namePlaceholder")}
          />
          {errors.name && (
            <p className="text-red-500 mt-2" role="alert">
              {errors.name.message}
            </p>
          )}
          <Input
            {...register("email")}
            placeholder={t("contactPage.emailPlaceholder")}
          />
          {errors.email && (
            <p className="text-red-500 mt-2" role="alert">
              {errors.email.message}
            </p>
          )}
          <Textarea
            {...register("message", { required: "Message is required" })}
            placeholder={t("contactPage.messagePlaceholder")}
            className="h-32"
          />
          {errors.message && (
            <p className="text-red-500 mt-2" role="alert">
              {errors.message.message}
            </p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900/70 text-white hover:bg-blue-900/50"
          >
            {isSubmitting ? "Submitting..." : t("contactPage.submitButton")}
          </Button>
          {successMessage && (
            <p className="text-green-500 mt-4" role="alert">
              {successMessage}
            </p>
          )}
        </form>

        {/* Contact Information */}
        <div className="mt-6 text-gray-700 mb-12">
          <h3 className="font-semibold mb-2">
            {t("contactPage.contactGuidelines")}
          </h3>
          <p>{t("contactPage.guidelineText")}</p>
        </div>
      </div>
    </div>
  );
}