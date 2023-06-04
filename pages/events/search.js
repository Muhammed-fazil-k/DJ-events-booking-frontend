//module alias
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";

//index.js will be the base page of this application
//Create a common layout which can be used for all pages
export default function SearchPage({ events }) {
    const router = useRouter();
  return (
    <Layout title='Search Results'>
        <Link href='/events'>{'< '}Go back</Link>
      <h1>Search Results for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}

//server will make
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $containsi: term,
          },
        },
        {
          performers: {
            $containsi: term,
          },
        },
        {
          description: {
            $containsi: term,
          },
        },
        {
          venue: {
            $containsi: term,
          },
        },
      ],
    },
  });
  //make req to api routes/serverless fns
  const res = await fetch(
    `${API_URL}/api/events?${query}&populate=*&sort=date`
  );
  const json = await res.json();
  const events = json.data;
  return {
    props: { events },
  };
}
