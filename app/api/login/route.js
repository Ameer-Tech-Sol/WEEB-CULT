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

    // set secure cookie
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          "Set-Cookie": `session_whatsapp=${user.whatsapp_number}; HttpOnly; Path=/; SameSite=Lax`,
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
