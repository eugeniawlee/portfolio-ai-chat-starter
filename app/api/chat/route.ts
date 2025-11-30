import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1) Simple sanity logs
  console.log("[/api/chat] TEST POST invoked - immediate response");

  // 2) Read but ignore body so we confirm request routing works
  try {
    const _body = await req.text().catch(() => "");
    console.log("[/api/chat] raw body length:", _body.length);
  } catch (err) {
    console.warn("[/api/chat] error reading body:", err);
  }

  // 3) Return an explicit JSON with Content-Type and Content-Length hints
  const payload = { ok: true, message: "immediate test response", time: Date.now() };
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-test-response": "immediate",
    },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "chat route ok" });
}
