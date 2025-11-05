import MyButton from './btn'
import Image from 'next/image'
import Link from 'next/link'

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h1>Xiaojie Cui, Fall 2025, CS5610</h1>
      <p>
        <Link href="https://kambaz-next-js-swart.vercel.app/">My Vercel link</Link>
      </p>

      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>

      <section id="wd-h-tag">
        <h4>Heading Tags</h4>
        <p>
          Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a
          short title or heading that attempts to summarize the topic of the section it precedes.
        </p>
      </section>

      <section id="wd-lists">
        <h4>List Tags</h4>
        <p>My favorite books:</p>
        <ul>
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
        </ul>
      </section>

      <section id="wd-images">
        <h4>Image example</h4>
        <Image alt="starship" src="/images/teslabot.jpg" width={400} height={200} />
      </section>

      <section id="wd-buttons">
        <h4>Button example</h4>
        <MyButton />
      </section>
    </div>
  )
}
