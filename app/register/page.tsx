"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {

    const router = useRouter();
  const [whatsapp, setWhatsapp] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Registering...");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        whatsapp_number: whatsapp,
        username,
        age: Number(age),
        password,
      }),
    });

    const data = await res.json();
    


    if (data.success) {
      setMessage("✅ Registration successful!");
      setPassword("");
      router.push(`/profile/${whatsapp}`);
    } else {
      setMessage(`❌ ${data.error}`);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="WhatsApp number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
            <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>


        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
