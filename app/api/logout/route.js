export async function POST() {
  return new Response(
    JSON.stringify({ success: true }),
    {
      headers: {
        "Set-Cookie": "session_whatsapp=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
        "Content-Type": "application/json",
      },
    }
  );
}
