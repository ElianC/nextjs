import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Page() {
    const router = useRouter()
    const id = 99

    return (
        <section>
            <h2>Page Notes Index</h2>
            <nav>
                Pinned:
                <Link href="/notes/[id]" as={`/notes/3`}>
                    <a>
                        Note 3
                    </a>
                </Link>
                <Link href="/notes/[...params]" as={`/notes/1/2`}>
                    <a>
                        Note 1 &amp; 2
                    </a>
                </Link>
            </nav>
            <button onClick={e => router.push('/notes/[id]', `/notes/${id}`)}>
                view last note:
            </button>
        </section>
    )
}

export default Page