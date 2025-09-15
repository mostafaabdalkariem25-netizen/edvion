import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    topic: "",
    level: "",
    style: "",
    time: "",
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    { key: "topic", label: "🧑‍💻 ماذا تريد أن تتعلم؟" },
    { key: "level", label: "📊 ما هو مستواك الحالي؟ (Beginner / Intermediate / Advanced)" },
    { key: "style", label: "📚 تفضل التعلم كيف؟ (نظري / عملي / فيديوهات / مقالات)" },
    { key: "time", label: "⏳ كم ساعة تستطيع أن تتعلم أسبوعياً؟" },
  ];

  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[step].key]: e.target.value });
  };

  const nextStep = async () => {
    if (!answers[questions[step].key].trim()) {
      alert("يرجى إدخال قيمة قبل المتابعة");
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await axios.post("/api/generate-plan", { answers });
        setPlan(res.data);
      } catch (err) {
        console.error("خطأ في إنشاء الخطة:", err);
        alert("حدث خطأ أثناء إنشاء الخطة");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      {!plan ? (
        <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md">
          {loading ? (
            <p>⏳ جاري إنشاء الخطة...</p>
          ) : (
            <>
              <h2 className="text-xl mb-4">{questions[step].label}</h2>
              <input
                className="w-full border rounded p-2 mb-4"
                value={answers[questions[step].key] || ""}
                onChange={handleChange}
                onKeyPress={(e) => e.key === "Enter" && nextStep()}
              />
              <button
                onClick={nextStep}
                disabled={loading}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {step === questions.length - 1 ? "إنشاء الخطة" : "التالي"}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-2xl">
          <h2 className="text-2xl mb-4">📅 خطة التعلم الخاصة بك</h2>
          <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {plan.plan || JSON.stringify(plan, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
}
