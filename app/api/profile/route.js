import pool from "@/src/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const whatsapp = searchParams.get("whatsapp");

    if (!whatsapp) {
      return Response.json(
        { success: false, error: "WhatsApp number is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE whatsapp_number = $1",
      [whatsapp]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
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
