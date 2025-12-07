import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";
import React, { useState } from "react";
import RegisterSwitcher from "@/components/RegisterSwitcher";
import Navbar from "@/components/Navbar";

const Register = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-2 md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Đăng ký tư vấn <span className="text-primary">cá nhân hóa</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Để nhận được tư vấn sớm nhất
            </p>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto ">
            <RegisterSwitcher />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
