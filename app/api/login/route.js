import pool from "@/src/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { whatsapp_number, password } = body;

    if (!whatsapp_number || !password) {
      return Response.json(
        { success: false, error: "Missing credentials" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE whatsapp_number = $1",
      [whatsapp_number]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return Response.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // --- UPDATED COOKIE LOGIC ---
    const isProduction = process.env.NODE_ENV === "production";

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          // Added 'Secure' for Vercel and 'Max-Age' (7 days)
          "Set-Cookie": `session_whatsapp=${user.whatsapp_number}; HttpOnly; Path=/; SameSite=Lax; ${isProduction ? 'Secure;' : ''} Max-Age=${60 * 60 * 24 * 7}`,
          "Content-Type": "application/json"
        }
      }
    );
    // --- END UPDATED LOGIC ---

  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}