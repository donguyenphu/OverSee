import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";
import React, { useState } from "react";
import OverSeeForm from "@/components/OverSeeStudentForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Đăng ký <span className="text-primary">lĩnh vực bạn chọn</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Để nhận được tư vấn sớm nhất
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <OverSeeForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
