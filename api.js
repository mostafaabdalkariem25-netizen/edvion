
async function generatePlan(answers) {
  const response = await fetch("https://api-inference.huggingface.co/models/your-model", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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", // استبدل لو حابب
      "Content-Type": "application/json"
    },
    body: JSON.stringify(answers)
  });

  if (!response.ok) {
    throw new Error("فشل الاتصال بالـ API");
  }

  return await response.json();
}