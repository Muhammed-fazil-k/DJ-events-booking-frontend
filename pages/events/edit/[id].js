import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import moment from "moment/moment";
import { FaImage } from "react-icons/fa";
export default function EditEventPage({ evt }) {
  console.log(evt.date);
  const router = useRouter();
  const eventDetails = evt.attributes;
  const [values, setValues] = useState({
    name: eventDetails.name,
    performers: eventDetails.performers,
    venue: eventDetails.venue,
    address: eventDetails.address,
    date: eventDetails.date,
    time: eventDetails.time,
    description: eventDetails.description,
  });
  const [imgPreview, setImgPreview] = useState(
    evt.attributes.image
      ? evt.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    //handleValidation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill all fields");
    } else {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });
      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.data.attributes.slug}`);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Edit Events">
      <ToastContainer />
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Edit Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imgPreview ? (
        <Image src={imgPreview} alt="Dj Events" height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary">
          <FaImage/> Set image
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      evt: data.data,
    },
  };
}
