import React, { useState } from "react";
import TargetPersonaRemoveBg from "@/assets/TargetPersonaRemoveBg.jpg";
import HappyStudentAnimation from "@/assets/HappyStudent.avif";
import "../Introduction.css";

export default function HappyStudent() {
	const pillars = [
		{
			id: "a",
			short: "Tư duy học tập chủ động",
			title: "1. Tư duy học tập chủ động",
			details:
				`Hiểu mình để học đúng: Biết điểm mạnh – yếu, đặt mục tiêu rõ ràng cho từng giai đoạn.\n\n` +
				`Tư duy phản biện: Biết đặt câu hỏi, dám thử và sai, tìm lời giải thay vì chờ được chỉ bài.\n\n` +
				`Tinh thần học thật: Học để hiểu, không học vì điểm hay vì người khác.`,
		},
		{
			id: "b",
			short: "Kỹ năng phát triển bản thân",
			title: "2. Kỹ năng phát triển bản thân toàn diện",
			details:
				`Kỹ năng học tập hiệu quả: Biết lên kế hoạch, ghi nhớ, tổng hợp và trình bày ý tưởng mạch lạc.\n\n` +
				`Quản lý thời gian và cảm xúc: Cân bằng việc học – nghỉ ngơi – phát triển sở thích cá nhân.\n\n` +
				`Tự tin, hợp tác, sẻ chia: Biết làm việc nhóm, biết lắng nghe, biết giúp đỡ và truyền cảm hứng.`,
		},
		{
			id: "c",
			short: "Động lực nội tại & hành trình",
			title: "3. Động lực nội tại và hành trình bền vững",
			details:
				`Học vì hiểu giá trị: Nhìn thấy ý nghĩa của việc học trong tương lai của bản thân.\n\n` +
				`Tự duy trì động lực: Có phương pháp, có người đồng hành, và biết cách đứng dậy sau thất bại.\n\n` +
				`Định hướng phát triển lâu dài: Không học để “chạy đua”, mà để xây nền cho sự trưởng thành.`,
		},
	];

	const [open, setOpen] = useState<Record<string, boolean>>(
		Object.fromEntries(pillars.map((p) => [p.id, false]))
	);
	const toggle = (id: string) => setOpen((s) => ({ ...s, [id]: !s[id] }));

	return (
		<section className="w-full max-w-6xl mx-auto px-4 py-12">
			<div className="text-center mb-8">
				<h2 className="text-6xl font-bold">
					Chân dung{" "}
					<span className="text-primary">Học viên Hạnh phúc</span>
				</h2>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
				{/* Persona card */}
				<div className="flex items-center justify-center">
					<div className="relative w-full max-w-lg">
						<div
							className="rounded-3xl p-6 shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.01]"
							style={{
								background:
									"radial-gradient(ellipse at top, rgba(3,12,46,1) 0%, rgba(0,37,77,1) 60%)",
							}}
						>
							<div className="flex flex-col lg:flex-row items-center gap-6">
								<div className="flex-shrink-0">
									<div className="w-44 h-44 rounded-full overflow-hidden bg-orange-500 ring-4 ring-white/10 shadow-lg transform transition-transform hover:scale-105">
										<img
											src={HappyStudentAnimation}
											alt="persona"
											className="w-full h-full object-cover bg-orange-500"
										/>
									</div>
								</div>

								<div className="text-center lg:text-left">
									{/* <div className="mb-2">
										<span className="inline-block bg-blue-700/80 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
											The striving opportunity seeker
										</span>
									</div> */}

									<h3 className="text-4xl font-bold text-yellow-400 leading-tight">
										Học viên OverSee
									</h3>

									<p className="text-md text-white/90 mt-2">
										Người học biết cách học, biết cách lớn lên và tìm thấy niềm vui thật trong tri thức.
                    <br />
										Để trở thành Học viên Hạnh phúc không chỉ cần điểm tốt hay thành tích nổi bật — mà là
										tự chủ, tư duy đúng và niềm vui học tập bền vững.
									</p>

									<div className="mt-4 grid grid-cols-1 gap-2 text-md text-white/90">
										<div>
											<p className="text-md">
												<strong className="text-white">Nền tảng:</strong> Tư duy chủ động · Kỹ năng toàn diện · Động lực bền vững
											</p>
										</div>
										<div>
											<p className="text-md">
												<strong className="text-white">Mục tiêu:</strong> Học để hiểu và trưởng thành
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="mt-6 bg-white/5 rounded-xl p-4 text-white/90">
								<h4 className="text-md font-semibold text-white mb-2">Điểm mạnh</h4>
								<ul className="text-md list-disc ml-5 space-y-1 font-bold">
									<li>Biết lên kế hoạch và tự điều chỉnh lộ trình học</li>
									<li>Ưu tiên hiểu sâu thay vì chạy theo điểm số</li>
									<li>Giữ động lực qua mục tiêu rõ ràng và người đồng hành</li>
								</ul>
							</div>
						</div>
{/* 
						<div className="absolute -top-6 left-1/2 -translate-x-1/2">
							<div className="bg-transparent px-4 py-1 rounded-full">
								<span className="text-sm font-semibold text-[#ffd966]">
									Target Persona
								</span>
							</div>
						</div> */}
					</div>
				</div>

				{/* Pillars */}
				<div className="flex flex-col gap-4">
					{pillars.map((p) => (
						<article
							key={p.id}
							className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 transform transition-all hover:-translate-y-1"
							aria-labelledby={`title-${p.id}`}
						>
							<header className="flex items-start justify-between gap-4">
								<div>
									<h3
										id={`title-${p.id}`}
										className="text-lg font-semibold text-foreground"
									>
										{p.title}
									</h3>
									<p className="mt-1 text-md text-muted-foreground">
										{p.short}
									</p>
								</div>

								<button
									onClick={() => toggle(p.id)}
									className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-md bg-primary/5 hover:bg-primary/10 transition"
									aria-expanded={!!open[p.id]}
									aria-controls={`detail-${p.id}`}
								>
									{open[p.id] ? "Ẩn" : "Xem chi tiết"}
								</button>
							</header>

							<div
								id={`detail-${p.id}`}
								className={`mt-4 overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
									open[p.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
								}`}
								style={{ willChange: "max-height, opacity" }}
							>
								{open[p.id] && (
									<div className="text-md text-foreground bg-surface p-3 rounded-md animate-fadeIn">
                    <strong>
										{p.details.split("\n\n").map((paragraph, idx) => (
											<p key={idx} className="mb-2">
												{paragraph}
											</p>
										))}
                    </strong>
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			</div>

			<div className="rounded-md px-3 py-3 m-auto mt-10 w-full text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500">
				<p className="text-3xl font-bold">
					Học viên Hạnh phúc OverSee không chỉ giỏi hơn mà còn{" "}
					<span className="text-orange-500 font-bold">
						hiểu mình hơn, vững vàng hơn
					</span>{" "}
					và hạnh phúc hơn trên hành trình học tập.
				</p>
			</div>

			{/* small extra styles for subtle animation (works with Tailwind utility classes) */}
			<style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 300ms ease both;
        }
      `}</style>
		</section>
	);
}


