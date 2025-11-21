import { useEffect, useState } from "react";

const faqs = [
    {
        question: '1. OverSee có những chương trình học nào?',
        answer: (
            <>
                OverSee hiện cung cấp các khóa học <strong className="font-bold">IELTS, SAT</strong> và các môn theo chương trình giáo dục Việt Nam như <strong className="font-bold">Toán, Văn, Anh,…</strong><br></br>
                Tất cả các khóa học đều được triển khai theo hình thức <strong className="font-bold">1–1 online</strong>, giúp cá nhân hóa lộ trình học theo năng lực, mục tiêu và tốc độ riêng của từng học sinh.
            </>
        )
    },
    {
        question: '2. Học ở OverSee có gì khác so với học thêm hay học gia sư?',
        answer: (
            <>
                Tại OverSee, học sinh <strong>không được “dạy học” mà được “dạy cách tự học”</strong> để một ngày không xa sẽ không còn phải phụ thuộc vào lớp học thêm nữa.<br></br>
                Thay vì nghe giảng bài mới trong tiết học như ở lớp thêm, <strong>học viên OverSee sẽ tự tìm hiểu và làm bài trước buổi học</strong>.Trong giờ học, <strong>Mentor chỉ tập trung giải đáp thắc mắc, gợi mở tư duy và rèn kỹ năng tự học</strong>, giúp các em thực sự hiểu sâu và nhớ lâu.
                <br></br>Không chỉ vậy, <strong>Mentor còn đồng hành xây dựng lộ trình học tập cá nhân, hướng dẫn cách quản lý thời gian và cân bằng giữa học – chơi</strong>, giúp học viên thay đổi toàn diện cả <strong>thói quen học tập lẫn cuộc sống</strong>.
            </>
        )
    },
    {
        question: '3. Chi phí học tại OverSee thế nào?',
        answer: (
            <>
                OverSee có nhiều chương trình học khác nhau – từ luyện thi IELTS, SAT đến các môn học theo chương trình Việt Nam.<br></br>
                Chi phí sẽ phụ thuộc vào <strong>lộ trình</strong> và <strong>thời lượng học cá nhân hóa</strong> của từng học viên, nên không có một mức giá cố định chung.<br></br>
                Phụ huynh và học sinh có thể nhắn tin trực tiếp cho <strong><a href="https://www.facebook.com/oversee.org" className="text-orange-500">fanpage OverSee</a></strong> để được tư vấn chi tiết và thiết kế lộ trình học phù hợp nhất với mục tiêu, ngân sách và thời gian của mình.
            </>
        )
    },
    {
        question: '4. Học sinh đang mất động lực học, OverSee có giúp được không?',
        answer: (
            <>
                <ul>
                    Đây chính là nhóm học sinh mà OverSee đồng hành <strong>hiệu quả nhất</strong>.
                    <br></br>
                    Thông qua <strong>quy trình 3 bước: Khám phá – Đồng hành – Dẫn lối</strong>, chúng tôi giúp học sinh:
                </ul>
                <li>Xác định <strong>nguyên nhân gốc</strong> của việc mất động lực.</li>
                <li>Khơi lại <strong>niềm hứng thú và sự tự tin trong học tập.</strong></li>
                <li>Tạo <strong>thói quen học tích cực và bền vững.</strong>
                    Nhiều học viên từng “chán học” đã quay lại yêu thích việc học và đạt kết quả tốt chỉ sau <strong>6–8 tuần.</strong>
                </li>
            </>
        )
    },
    {
        question: '5. Khi nào là thời điểm thích hợp để tham gia OverSee?',
        answer: (
            <>
                <ul>Bất cứ khi nào bạn sẵn sàng phát triển bản thân!</ul>
                <li>OverSee đồng hành cùng <strong>học sinh từ tiểu học đến THPT</strong>, cũng như <strong>những học viên muốn trau dồi kỹ năng học tập hoặc nâng cao tiếng Anh.</strong></li>
                <li>Dù bạn đang bắt đầu hành trình học tập hay muốn bứt phá hơn nữa, OverSee luôn có <strong>lộ trình phù hợp với mục tiêu và năng lực riêng của bạn.</strong></li>
            </>
        )
    }
]

export default function FaqPagination() {
    const [index, setIndex] = useState(0);
    const [anim, setAnim] = useState<"fade-in" | "fade-out">("fade-in");

    const goTo = (newIndex: number) => {
        setAnim("fade-out");

        setTimeout(() => {
            setIndex(newIndex);
            setAnim("fade-in");
        }, 200); // animation duration
    };

    const prev = () =>
        goTo(index === 0 ? faqs.length - 1 : index - 1);

    const next = () =>
        goTo(index === faqs.length - 1 ? 0 : index + 1);

    // Auto play every 5s
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    });

    const item = faqs[index];

    return (
        <section className="w-9/10 mx-auto p-20 md:py-23 bg-white shadow-sm select-none">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold">FAQs (Câu hỏi thường gặp)</h2>

                <div className="flex gap-2">
                    <button
                        onClick={prev}
                        className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Q + A box with animation */}
            <div
                className={`transition-all duration-300 ${anim === "fade-in"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                    }`}
            >
                {/* Q */}
                <div className="flex items-start gap-8 mb-4">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
                        Q
                    </div>
                    <p className="flex-1 border-b pb-1 text-lg">
                        <strong className="font-bold text-2xl">{item.question}</strong>
                    </p>
                </div>

                {/* A */}
                <div className="flex items-start gap-8">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center font-semibold">
                        A
                    </div>
                    <p className="flex-1 border-b pb-1 text-gray-800 text-xl leading-relaxed">
                        {item.answer}
                    </p>
                </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 gap-2">
                {faqs.map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${i === index ? "bg-black scale-110" : "bg-gray-300"
                            }`}
                        onClick={() => goTo(i)}
                    />
                ))}
            </div>
        </section>
    );
}