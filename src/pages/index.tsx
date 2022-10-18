import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  const data = await response.json();

  const { meals } = data;

  return {
    props: {
      meals,
    },
    revalidate: 10
  }
};

export default function Home({ meals }) {
  return (
    <div>
      <h1>Bem vindo!</h1>
      <article style={{ display: 'flex', flexDirection: 'column' }}>
        {
          meals.map(({ strCategory }) => (
            <label
              htmlFor="input-category"
              key={ strCategory }
            >
              <input
                id="input-category"
                type="radio"
              />
              { strCategory }
            </label>
          ))
        }
      </article>
    </div>
  )
}
