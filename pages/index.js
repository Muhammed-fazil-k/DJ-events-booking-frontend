
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
        <EventItem key={evt.id} evt={evt.attributes}/>
      ))}
      {events.length > 0 && (
        <Link className='btn-secondary' href='/events'>View all events</Link>
      )}
    </Layout>
  )
}

//During project build,this code makes static api call and fetch data
//For each 1 second code will revalidate that data
export async function getStaticProps(){
  //make req to api routes/serverless fns
  //use populate to get all datas like referential ans image values
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date&pagination[limit]=3`);
  const json = await res.json();
  const events = json.data
  
  return {
    props:{events },
    revalidate:1 //seconds to check if data changes on getStatisProps
  }
}