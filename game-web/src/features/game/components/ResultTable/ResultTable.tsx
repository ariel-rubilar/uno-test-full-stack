"use client";

import { useState } from "react";

import { Search, Trophy, ListX } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Table } from "@/shared/components/ui/Table";

import { useListGameResult } from "../../hooks/useListGameResult/useListGameResult";
import { RutInput } from "@/shared/components/RutInput";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { cleanRut } from "@/shared/rut/clean-rut";

export const ResultsTable = () => {
  const [filter, setFilter] = useState("");

  const run = useDebounce(filter, 600);

  const { data: results = [] } = useListGameResult({
    run: cleanRut(run),
  });

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title className="flex items-center gap-2 text-lg">
          <Trophy className="size-5 text-primary" />
          Recent Results
        </Card.Title>
        <Card.Description>
          {results.length} game{results.length !== 1 ? "s" : ""} played
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <RutInput
            placeholder="Filter by run"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9"
            aria-label="Filter results by run"
          />
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
            <ListX className="size-10" />
            <p className="text-sm">
              {results.length === 0
                ? "No games played yet. Be the first!"
                : "No results match your search."}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Player</Table.Head>
                  <Table.Head className="text-center">Pairs</Table.Head>
                  <Table.Head className="text-center">Attempts</Table.Head>
                  <Table.Head className="text-center">Result</Table.Head>
                  <Table.Head className="hidden sm:table-cell">Date</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {results.map((result) => (
                  <Table.Row key={result.id}>
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {result.playerRun}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {result.playerName}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-center font-mono">
                      {result.correctPairs}/{result.totalPairs}
                    </Table.Cell>
                    <Table.Cell className="text-center font-mono">
                      {result.attempts}/{result.maxAttempts}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {result.outcome === "win" ? (
                        <Badge className="bg-success text-success-foreground">
                          Won
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Lost</Badge>
                      )}
                    </Table.Cell>
                    <Table.Cell className="hidden text-muted-foreground sm:table-cell">
                      {new Date(result.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        )}
      </Card.Content>
    </Card.Root>
  );
};
