import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt ,id}) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/events/${id}`,{
        method:"DELETE",

      })
      const data = await res.json()
      if(!res.ok){
        toast.error(data.message)
      }else{
        router.push('/events')
      }
    }
  };
  return (
    <Layout>

      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <FaPencilAlt /> Edit event
          </Link>
          <Link href="#" onClick={deleteEvent} className={styles.delete}>
            <FaTimes /> Delete event
          </Link>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer/>
        {evt.image && (
          <div className={styles.image}>
            {
              evt.image.data && <Image alt="dj events" src={evt.image.data.attributes.formats.medium.url} width={960} height={600} />
            }
            
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events' className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const json = await res.json();
  const events = json.data
  //paths should be like
  // paths:[
  //   {params:{slug:1}},
  //   {params:{slug:2}}
  // ]
  const paths = events.map((ev) => ({ params: { slug: ev.attributes.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?filters[slug]slug=${slug}&populate=*`);
  const json = await res.json();
  const events = json.data
  return {
    props: {
      evt:events[0].attributes,
      id:events[0].id
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({query:{slug}}){
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   return {
//     props:{
//       evt:events[0]
//     }
//   }
// }
