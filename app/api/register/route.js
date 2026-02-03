import pool from "@/src/lib/db";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    const body = await req.json();
    const { whatsapp_number, username, age, password } = body;

    if (!whatsapp_number) {
      return Response.json(
        { success: false, error: "WhatsApp number is required" },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
        return Response.json(
            { success: false, error: "Password must be at least 6 characters" },
            { status: 400 }
        );
    }

    const passwordHash = await bcrypt.hash(password, 10);



    const result = await pool.query(
      `
      INSERT INTO users (whatsapp_number, username, age, password_hash)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (whatsapp_number) DO NOTHING
      RETURNING *
      `,
      [whatsapp_number, username || null, age || null, passwordHash]
    );

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        message: "User already exists",
      });
    }

    return Response.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
