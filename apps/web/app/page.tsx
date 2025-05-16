"use client"
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {
  //we should use react forms and all that here
  const [roomSlug, setRoomSlug] = useState("");
  const router = useRouter();

  return (
    <div className={styles.page}>
      <input 
      type="text"
      placeholder="room id"
      value={roomSlug}
      onChange={(e) => setRoomSlug(e.target.value)}
      />
      <button onClick={() => {
        router.push(`/room/${roomSlug}`);
      }}>
        submit
      </button>
    </div>
  );
}
