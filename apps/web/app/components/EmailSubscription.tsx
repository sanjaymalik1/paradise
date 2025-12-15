"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Percent } from "lucide-react";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // TODO: Add email subscription logic here
    console.log("Email submitted:", email);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="mx-12 mt-12 mb-8">
      {/* <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-l border border-gray-300 p-6"> */}
          <div className="flex items-center justify-between max-w-7xl mx-auto rounded-l border border-gray-300 p-6">
            
            {/* Left Section - Content */}
            <div className="flex items-center space-x-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <div className="relative">
                  <Percent className="w-6 h-6 text-orange-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Get access to exclusive deals
                </h3>
                <p className="text-gray-600 text-sm">
                  Only the best deals reach your inbox
                </p>
              </div>
            </div>

            {/* Right Section - Form */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-3 ">
              <Input
                type="email"
                placeholder="e.g., john@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-64 h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 h-11 font-medium"
              >
                {isSubmitting ? "Submitting..." : "Notify me"}
              </Button>
            </form>
          {/* </div>
        </div> */}
      </div>
    </section>
  );
}