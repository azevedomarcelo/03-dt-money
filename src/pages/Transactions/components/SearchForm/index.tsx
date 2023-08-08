import { MagnifyingGlass } from "phosphor-react";
import { SearcFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>


export function SearchForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchTransactions(data: SearchFormInput) {
    console.log(data)
  }

  return (
    <SearcFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearcFormContainer>
  )
}