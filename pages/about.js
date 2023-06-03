import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

export default function AboutPage() {
  return (
    <Layout title='About DJ Page'>
      <h1>

      About
      </h1>
      <p>
        This is an app to find out about latest dj events
      </p>
      <Link href='/'>Home</Link>

    </Layout>
  )
}
