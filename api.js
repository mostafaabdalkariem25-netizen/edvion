// api.js

const API_URL = "https://api-inference.huggingface.co/models/gpt2"; 
// غير gpt2 للموديل اللي مخصص لك إذا عندك واحد
const API_KEY = "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";

/**
 * إرسال إجابات المستخدم للـ AI API وتوليد خطة تعلم
 */
async function generatePlan(answers) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": Bearer ${API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: 
        المستخدم يريد خطة تعلم:
        - الموضوع: ${answers.topic}
        - المستوى: ${answers.level}
        - الطريقة المفضلة: ${answers.style}
        - الوقت المتاح أسبوعياً: ${answers.time} ساعة

        أنشئ له خطة تعليمية منظمة مع مصادر مناسبة.
        
      })
    });

    if (!response.ok) {
      throw new Error("فشل الاتصال بالـ API");
    }

    const data = await response.json();

    // HuggingFace بيرجع النتيجة عادة في شكل array مع text
    const output = data[0]?.generated_text || "⚠️ لم أتمكن من توليد خطة حالياً.";

    return {
      plan: output
    };
  } catch (error) {
    console.error("API Error:", error);
    return { plan: "❌ حصل خطأ أثناء توليد الخطة." };
  }
}
