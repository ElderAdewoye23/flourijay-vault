"use client";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Camera } from "lucide-react";
import { FaInstagram, FaXTwitter, FaTiktok} from "react-icons/fa6";
import Link from "next/link";

export default function ProfilePage() {
  const owner = {
    name: "Flourijay",
    storeName: "Flourijay Vault",
    email: "jamiulateef53@gmail.com",
    phone: "+234 808 748 9412",
    description:
      "Welcome to Flourijay’s Vault — your one-stop shop for premium accessories that blend elegance with style. Every product is crafted with care and precision.",
    socials: {
      instagram: "https://instagram.com/TheFlourijayVault",
      X: "https://x.com/Flourijay",
      tiktok: "https://tiktok.com/@Flourijay",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center">
      <Card className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        {/* Profile Image Section */}
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 flex justify-center items-center">
          {/* Placeholder image (can replace with actual upload later) */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
            <Image
              src="/owner-placeholder.jpg" // replace later with dynamic src
              alt="Profile"
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Upload Icon (for later use) */}
          <button
            className="absolute bottom-4 right-6 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
            title="Change photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Header */}
        <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {owner.storeName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{owner.name}</p>
        </CardHeader>

        {/* Details */}
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>{owner.description}</p>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {owner.email}
            </p>
            <p className="flex items-center gap-2">
             <Link href={`tel:${owner.phone}`}>
              <Phone className="w-4 h-4" /> {owner.phone}
             </Link>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" asChild>
              <a href={owner.socials.instagram} target="_blank" rel="noreferrer">
                <FaInstagram className="w-4 h-4 mr-2" /> Instagram
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={owner.socials.X} target="_blank" rel="noreferrer">
                <FaXTwitter className="w-4 h-4 mr-2" /> Facebook
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={owner.socials.X} target="_blank" rel="noreferrer">
                <FaTiktok className="w-4 h-4 mr-2" /> Facebook
              </a>
            </Button>
          </div>
        </CardContent>

       
      </Card>
    </div>
  );
}
