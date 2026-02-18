import { useMutation } from "@tanstack/react-query";
import { recordResult } from "../../servcies/game-results.services";
import { queryClient } from "@/shared/api/query-client";

export const useRecordResult = () => {
  const results = useMutation({
    mutationFn: recordResult,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["results"],
      });
    },
  });

  return results;
};
