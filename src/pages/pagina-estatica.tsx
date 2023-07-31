/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { GetStaticProps } from "next";
import { ICity } from "@/types/city.d";
import styles from "@/styles/lista.module.css";

function Lista({ cities }: { cities: Array<ICity> }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>
        <div data-list-container>
          {cities?.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/cities/10");

    const cities = await response.json();

    if (!response.ok) throw new Error("Erro ao obter os dados");

    return {
      props: { cities },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: { cities: [] },
    };
  }
};

export default Lista;