import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
// import Image from 'next/image';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);

  const data = await response.json();

  const { meals } = data;

  const paths = meals?.map(({ strCategory }) => {
    return {
      params: {
        category: strCategory,
      }
    }
  });

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { category } = context.params;

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ category }`);

  const data = await response.json();

  return {
    props: {
      categoryInfo: data,
    },
    revalidate: 10,
  }
}

export default function Meals({ categoryInfo }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{
      width: '98vw',
      padding: '3vw 0',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '3vw',
      justifyContent: 'center',
    }}>
      {
        categoryInfo?.meals?.map(({ strMeal, strMealThumb, idMeal }) => (
          <article
            key={ idMeal }
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '30vw',
              height: '30vw',
              flexDirection: 'column',
              border: '1px solid black',
              borderRadius: '6px',
            }}
          >
            <h3>{ strMeal }</h3>
            <img
              style={{ width: '15vw', height: '15vw' }}
              src={ strMealThumb }
              alt={ strMeal }
            />
          </article>
        ))
      }
    </div>
  )
}
