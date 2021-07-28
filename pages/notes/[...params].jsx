import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Page() {
    const router = useRouter()
    const { params } = router.query

    const notes = params?.join(', ') || 'hello world'

    return (
        <section>
            <h2>My notes: {notes}</h2>
            <Link href="/notes">
                Go Back
            </Link>
        </section>
    )
}

export default Page