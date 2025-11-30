import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Do server-side work here (DB, OpenAI, etc.)
    const reply = { ok: true, received: body };

    return NextResponse.json(reply);
  } catch (err) {
    console.error("route POST error:", err);
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

// optional: export GET if you need it
export async function GET() {
  return NextResponse.json({ message: "chat route ok" });
}
