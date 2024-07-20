// pages/index.js
export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3000/api/route');
    const data = await res.json();
    return {
      props: { states: data }, // will be passed to the page component as props
    };
  }
  
  export default function Home({ states }) {
    return (
      <div>
        <h1>Energy Prices by State</h1>
        <ul>
          {states.records.map((state) => (
            <li key={state.id}>{state.name}: ${state.energyPrice}</li>
          ))}
        </ul>
      </div>
    );
  }
  