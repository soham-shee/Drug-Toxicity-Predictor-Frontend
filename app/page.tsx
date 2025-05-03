import Head from 'next/head';
import InputForm from '../components/InputForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Compound Toxicity Checker</title>
      </Head>
        <InputForm />
    </div>
  );
}
