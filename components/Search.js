import React, { useState } from "react";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";
export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const handleForm = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`)
    setTerm('')
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleForm}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="search events"
        />
      </form>
    </div>
  );
}
