import pool from "@/src/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, whatsapp_number, username, age, coins, created_at FROM users ORDER BY created_at DESC"
    );

    return Response.json({
      success: true,
      users: result.rows,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
