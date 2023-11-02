import { router } from "@routes/Router";
import { routerContext } from "@tanstack/react-router";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockBeers } from "@tests/mocks";
import { expect, it } from "vitest";
import { BeerListItem } from "./BeerListItem";

it("loads and displays greeting", async () => {
  // ARRANGE
  const beer = mockBeers[0];
  render(
    <routerContext.Provider value={router}>
      <BeerListItem beer={beer} />
    </routerContext.Provider>,
  );

  // ACT
  await userEvent.click(screen.getByText("More"));
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent(beer.name);
});
