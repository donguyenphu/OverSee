import React, { useState } from "react";
import TargetPersonaRemoveBg from "@/assets/TargetPersonaRemoveBg.jpg";
import "../Introduction.css";

export default function HappyStudent() {
  const [showTop, setShowTop] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);

  return (
    <section className="w-9/10 mx-auto p-20 md:py-23 select-none">
      <div className="w-full min-h-screen items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Chân dung <span className="text-primary">học viên hạnh phúc</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá những tính năng đột phá giúp bạn học tập hiệu quả hơn
          </p>
        </div>
        <div className="relative max-w-xl w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center">
          {/* Center Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md z-10">
            <img
              src={TargetPersonaRemoveBg}
              alt="center"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Feature */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              className="px-4 py-1 bg-black text-white rounded-full text-sm"
              onClick={() => setShowTop(!showTop)}
            >
              {showTop ? "Hide" : "Show"}
            </button>
            {showTop && (
              <div className="bg-white p-3 rounded-xl shadow-md w-40 text-center text-sm">
                <p className="font-semibold">Ý chính 1</p>
                <ul className="list-disc text-left ml-4 mt-1">
                  <li>Ý phụ 1</li>
                  <li>Ý phụ 2</li>
                  <li>Ý phụ 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Feature */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <button
              className="px-4 py-1 bg-black text-white rounded-full text-sm"
              onClick={() => setShowRight(!showRight)}
            >
              {showRight ? "Hide" : "Show"}
            </button>
            {showRight && (
              <div className="bg-white p-3 rounded-xl shadow-md w-40 text-center text-sm">
                <p className="font-semibold">Ý chính 2</p>
                <ul className="list-disc text-left ml-4 mt-1">
                  <li>Ý phụ 1</li>
                  <li>Ý phụ 2</li>
                  <li>Ý phụ 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Feature */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              className="px-4 py-1 bg-black text-white rounded-full text-sm"
              onClick={() => setShowBottom(!showBottom)}
            >
              {showBottom ? "Hide" : "Show"}
            </button>
            {showBottom && (
              <div className="bg-white p-3 rounded-xl shadow-md w-40 text-center text-sm">
                <p className="font-semibold">Ý chính 3</p>
                <ul className="list-disc text-left ml-4 mt-1">
                  <li>Ý phụ 1</li>
                  <li>Ý phụ 2</li>
                  <li>Ý phụ 3</li>
                </ul>
              </div>
            )}
          </div>

          {/* Left Feature */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <button
              className="px-4 py-1 bg-black text-white rounded-full text-sm"
              onClick={() => setShowLeft(!showLeft)}
            >
              {showLeft ? "Hide" : "Show"}
            </button>
            {showLeft && (
              <div className="bg-white p-3 rounded-xl shadow-md w-40 text-center text-sm">
                <p className="font-semibold">Ý chính 4</p>
                <ul className="list-disc text-left ml-4 mt-1">
                  <li>Ý phụ 1</li>
                  <li>Ý phụ 2</li>
                  <li>Ý phụ 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-md px-3 py-3 m-auto mt-10 w-full text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500">
        <h4 className="text-2xl md:text-3xl font-bold text-foreground">
          Học viên Hạnh phúc OverSee không chỉ giỏi hơn mà còn{" "}
          <br />
          <span className="text-orange-500 px-1 scalable-span">
            hiểu mình hơn, vững vàng hơn và hạnh phúc hơn trên hành trình học tập.
          </span>
        </h4>
      </div>
    </section>
  );
}


