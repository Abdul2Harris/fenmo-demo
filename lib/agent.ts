export async function askFinanceAgent(
  question: string,
  transactions: { bank: any[]; ledger: any[] }
) {
  const context = JSON.stringify(transactions, null, 2);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a finance assistant. Answer questions 
accurately using only the transaction data provided. 
Always include specific amounts, dates, and vendor names.

Transaction data:
${context}

Question: ${question}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}