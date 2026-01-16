import {ref} from "vue";
import type {Country} from "@/model/Country.ts";

const GRAPHQL_ENDPOINT = "https://countries.trevorblades.com/";

export const useCountriesGraphql = () => {
  const countries = ref<Country[]>([]);
  const isLoading = ref(false);
  const isError = ref(false);
  const errorText = ref("");

  const loadCountries = async () => {
    isLoading.value = true;
    isError.value = false;
    errorText.value = "";

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query Countries {
            countries {
              code
              name
              emoji
              capital
              currency
            }
          }`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка GraphQL: ${response.status} ${response.statusText}`);
      }

      const payload = await response.json();

      if (payload.errors?.length) {
        throw new Error(payload.errors.map((error: { message: string }) => error.message).join(", "));
      }

      countries.value = payload.data?.countries ?? [];
    } catch (error) {
      isError.value = true;
      errorText.value = error instanceof Error ? error.message : String(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    countries,
    isLoading,
    isError,
    errorText,
    loadCountries,
  };
};
