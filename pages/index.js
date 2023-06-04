
//module alias
import Layout from '@/components/Layout'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import EventItem from '@/components/EventItem';

//index.js will be the base page of this application
//Create a common layout which can be used for all pages
export default function Home({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length ===0 && <h3>No events to show</h3>}
      {events.map(evt=>(
        <EventItem key={evt.id} evt={evt}/>
      ))}
      {events.length > 0 && (
        <Link className='btn-secondary' href='/events'>View all events</Link>
      )}
    </Layout>
  )
}

//server will make 
export async function getStaticProps(){
  //make req to api routes/serverless fns
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props:{events : events.slice(0,3)},
    revalidate:1
  }
}