import { useQuery } from "@tanstack/react-query";
import { listResult } from "../../servcies/game-results.services";

export const useListGameResult = ({ run }: { run?: string }) => {
  return useQuery({
    queryFn: () => listResult({ run }),
    queryKey: ["results", run],
  });
};
