import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "@tests/TestWrapper";
import { mockBeers } from "@tests/mocks";
import { expect, it } from "vitest";
import { BeerListItem } from "./BeerListItem";
import { Example } from "./Example";

it("loads and displays greeting", async () => {
  // ARRANGE
  const beer = mockBeers[0];
  render(
    <TestWrapper>
      <BeerListItem beer={beer} />
    </TestWrapper>,
  );

  // ACT
  await userEvent.click(screen.getByText("More"));
  await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent(beer.name);
});

it("updates value", async () => {
  // ARRANGE
  const beer = mockBeers[0];
  render(
    <TestWrapper>
      <Example beer={beer} />
    </TestWrapper>,
  );

  // ACT
  await userEvent.click(screen.getByText("Add"));

  // ASSERT
  expect(screen.getByText("1")).toBeInTheDocument();
});

it("updates value async", async () => {
  // ARRANGE
  const beer = mockBeers[0];
  render(
    <TestWrapper>
      <Example beer={beer} />
    </TestWrapper>,
  );

  // ACT
  await userEvent.click(screen.getByText("Add2"));

  await waitFor(() => {
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  // ASSERT
  expect(screen.getByText("1")).toBeInTheDocument();
});
