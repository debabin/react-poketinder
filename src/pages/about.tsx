import Link from 'next/link';

const About = () => (
  <section className='flex h-screen flex-col items-center justify-center'>
    <div className='mt-4' />
    <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
      <h1 className='text-xl font-bold'>Join to community 😎</h1>
      <ul className='text-xl text-blue-400'>
        <li>
          <Link href='https://github.com/TheoBr/roundest-mon'>Github Repository</Link>
        </li>
        <li>
          <Link href='https://www.youtube.com/c/SIBERIACANCODE'>Youtube</Link>
        </li>
        <li>
          <Link href='https://github.com/debabin/react-poketinder'>Discord</Link>
        </li>
        <li>
          <Link href='https://t.me/siberiacancode'>Telegram</Link>
        </li>
      </ul>
    </div>
    <div className='mt-4 text-blue-500'>
      <Link href='/'>Home</Link>
    </div>
  </section>
);

export default About;
