//module alias
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

const PER_PAGE = 2;


//index.js will be the base page of this application
//Create a common layout which can be used for all pages
export default function EventsPage({ events,page,count}) {
  const totalPage = count/PER_PAGE
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {page>1 && <Link className="btn-secondary" href={`/events?page=${+page-1}`}>Prev</Link>}
      {page<totalPage && <Link className="btn-secondary" href={`/events?page=${+page+1}`}>Next</Link>}

    </Layout>
  );
}

//server will make
export async function getServerSideProps({ query: { page = 1 } }) {
  let start = (+page - 1) * PER_PAGE;
  //make req to api routes/serverless fns
  const res = await fetch(
    `${API_URL}/api/events?populate=*&sort=date%3Adesc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const json = await res.json();
  const events = json.data;
  const count = json.meta.pagination.total;
  return {
    props: { events,page,count},
  };
}
