// app/profile/[whatsapp]/page.tsx
import React from "react";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";



type Props = {
  params: { whatsapp: string } | Promise<{ whatsapp: string }>;
};

export default async function ProfilePage({ params }: Props) {
  // UNWRAP params (this fixes the "params is a Promise" error)
  const { whatsapp } = await params;
  const cookieStore = await cookies();
    const sessionWhatsapp = cookieStore.get("session_whatsapp")?.value;

if (!sessionWhatsapp) {
  return (
    <main style={{ padding: 40 }}>
      <h2>🔒 Please log in first</h2>
      <a href="/login">Go to login</a>
    </main>
  );
}

if (sessionWhatsapp !== whatsapp) {
  return (
    <main style={{ padding: 40 }}>
      <h2>🚫 Access denied</h2>
      <p>This profile does not belong to you.</p>
    </main>
  );
}


  

  // fetch server-side (no-cache so page always shows latest)
  // Fix: Get the current domain automatically
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const host = typeof window !== "undefined" 
               ? window.location.host 
               : process.env.VERCEL_URL || "localhost:3000";
  
  const res = await fetch(
    `${protocol}://${host}/api/profile?whatsapp=${encodeURIComponent(whatsapp)}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!data?.success) {
    return (
      <main style={{ padding: 20, color: "#fff", background: "#000", minHeight: "100vh" }}>
        <h1>User not found ✖</h1>
        <p>We couldn't find a profile for <strong>{whatsapp}</strong>.</p>
      </main>
    );
  }

  const user = data.user;




  return (
    <main style={{ padding: 20, color: "#fff", background: "#000", minHeight: "100vh" }}>
      <h1>{user.username || "Unnamed Warrior"}</h1>
      <p><strong>WhatsApp:</strong> {user.whatsapp_number}</p>
      <p><strong>Age:</strong> {user.age ?? "—"}</p>
      <p><strong>Coins:</strong> {user.coins}</p>
      <p><small>Joined: {new Date(user.created_at).toLocaleString()}</small></p>
      <LogoutButton />

      


    </main>
  );
}
