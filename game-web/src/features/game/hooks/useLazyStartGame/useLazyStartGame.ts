import { useQuery } from "@tanstack/react-query";
import { start } from "../../servcies/gemaplays.services";

export const useLazyStartGame = () => {
  const query = useQuery({
    queryFn: start,
    queryKey: ["start"],
    enabled: false,
  });

  return query;
};
