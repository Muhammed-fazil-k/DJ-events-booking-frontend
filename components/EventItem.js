import React from "react";
import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";
export default function EventItem({ evt }) {
  //For Image tag u have to set width and height
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image.data ? evt.image.data.attributes.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
          alt="Dj event image"
        />
      </div>
      <div className={styles.info}>
        <span>
            {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link className='btn' href={`/events/${evt.slug}`}>
            Details
        </Link>
      </div>
    </div>
  );
}
