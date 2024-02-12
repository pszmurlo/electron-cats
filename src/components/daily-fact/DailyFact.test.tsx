import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CatFact } from "../../types/apiTypes";
import DailyFact from "./DailyFact";

describe("DailyFact Component", () => {
  const mockFact: CatFact = {
    text: "Cats can jump up to 6 times their height!",
    _id: "testId123",
  };

  test("renders loading state", () => {
    render(
      <DailyFact
        isLoading={true}
        fact={null}
        onAddToFavorites={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders the fact and buttons on hover", async () => {
    render(
      <DailyFact
        isLoading={false}
        fact={mockFact}
        onAddToFavorites={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    const card = screen.getByTestId("fact-card");

    await userEvent.hover(card);

    expect(screen.getByText(mockFact.text)).toBeInTheDocument();
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls addToFavorites handler on button click", async () => {
    const mockOnAddToFavorites = jest.fn();

    render(
      <DailyFact
        isLoading={false}
        fact={mockFact}
        onAddToFavorites={mockOnAddToFavorites}
        onDelete={jest.fn()}
      />
    );

    const card = screen.getByTestId("fact-card");

    await userEvent.hover(card);

    await userEvent.click(screen.getByText("Add to Favorites"));

    expect(mockOnAddToFavorites).toHaveBeenCalledTimes(1);
  });
});
