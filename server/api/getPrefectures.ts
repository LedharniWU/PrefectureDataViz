import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiKey = config.public.RESAS_API_KEY;
  try {
    const response = await fetch(`${config.public.API_BASE_URL}/prefectures`, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch prefectures");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // エラー処理
    console.error("API call failed:", error);
    return { statusCode: 500, message: "Internal Server Error" };
  }
});
