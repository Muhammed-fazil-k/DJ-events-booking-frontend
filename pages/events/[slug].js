import Layout from '@/components/Layout';
import { useRouter } from 'next/router'
import React from 'react'

export default function EventPage() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <h1>My Event</h1>
      <p>{router.query.slug}</p>
    </Layout>
  )
}
