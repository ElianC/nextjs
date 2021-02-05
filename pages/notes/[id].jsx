import React from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

function Page() {
    const router = useRouter()
    const { id } = router.query

    return (
        <section>
            <h2>My note {id}</h2>
            <Link href="/notes">
                Go Back
            </Link>
        </section>
    )
}

export default Page