import { expect, test } from "vitest";
import Home from "./app/page";
import { render, fireEvent, cleanup } from "@testing-library/react";

test("Home", async () => {
  const { getByText } = render(<Home />);
  const activityList = getByText(/List of Activities/i);
  expect(getByText("List of Activities")).toBeTruthy();
  const reporterList = getByText(/List of Reporters/i);
  expect(getByText("List of Reporters")).toBeTruthy();
  cleanup();
});

test("Add Activity button adds activity", async () => {
  const { getByText, getByLabelText } = render(<Home />);

  const name = getByLabelText(/Activity Name:/i);
  const desc = getByLabelText(/Activity Description:/i);
  const addButton = getByText(/Add Activity/i);

  fireEvent.change(name, { target: { value: "Relax" } });
  fireEvent.change(desc, { target: { value: "Just relax" } });
  fireEvent.click(addButton);

  expect(getByText("Relax")).toBeTruthy();
  expect(getByText("Just relax")).toBeTruthy();

  cleanup();
});

test("Add Reporter button adds reporter", async () => {
  const { getByText, getByLabelText } = render(<Home />);

  const name = getByLabelText(/Reporter Name:/i);
  const addButton = getByText(/Add Reporter/i);

  fireEvent.change(name, { target: { value: "Sammy Smith" } });
  fireEvent.click(addButton);

  expect(getByText("Sammy Smith")).toBeTruthy();
  expect(getByText("Unassigned")).toBeTruthy();

  cleanup();
});

test("Remove Activity button removes activity", async () => {
  const { getByText, getByLabelText, queryByText } = render(<Home />);

  fireEvent.change(getByLabelText(/Activity Name:/i), {
    target: { value: "Relax" },
  });
  fireEvent.change(getByLabelText(/Activity Description:/i), {
    target: { value: "Just relax" },
  });
  fireEvent.click(getByText(/Add Activity/i));

  expect(getByText("Relax")).toBeTruthy();

  fireEvent.click(getByText(/Remove/i));

  expect(queryByText("Relax")).toBeNull();

  cleanup();
});

test("Remove Reporter button removes reporter", async () => {
  const { getByText, getByLabelText, queryByText } = render(<Home />);

  fireEvent.change(getByLabelText(/Reporter Name:/i), {
    target: { value: "Sam" },
  });
  fireEvent.click(getByText(/Add Reporter/i));

  expect(getByText("Sam")).toBeTruthy();

  fireEvent.click(getByText(/Remove/i));

  expect(queryByText("Sam")).toBeNull();

  cleanup();
});

test("Promote Activity button promotes activity", async () => {
  const { getByText, getByLabelText, getAllByRole } = render(<Home />);

  fireEvent.change(getByLabelText(/Activity Name:/i), {
    target: { value: "Relax" },
  });
  fireEvent.change(getByLabelText(/Activity Description:/i), {
    target: { value: "Just relax" },
  });
  fireEvent.click(getByText(/Add Activity/i));

  fireEvent.change(getByLabelText(/Activity Name:/i), {
    target: { value: "Hike" },
  });
  fireEvent.change(getByLabelText(/Activity Description:/i), {
    target: { value: "Walk around" },
  });
  fireEvent.click(getByText(/Add Activity/i));

  const promoteButtons = getAllByRole("button", { name: /Promote/i });
  fireEvent.click(promoteButtons[1]);

  const activityListRows = getAllByRole("row");
  expect(activityListRows[1].textContent).toContain("Hike");
  expect(activityListRows[1].textContent).toContain("Walk around");

  cleanup();
});

test("Assign Reporter assigns reporter", async () => {
  const { getByText, getByLabelText, getAllByRole } = render(<Home />);

  fireEvent.change(getByLabelText(/Activity Name:/i), {
    target: { value: "Relax" },
  });
  fireEvent.change(getByLabelText(/Activity Description:/i), {
    target: { value: "Just relax" },
  });
  fireEvent.click(getByText(/Add Activity/i));

  fireEvent.change(getByLabelText(/Reporter Name:/i), {
    target: { value: "Sam" },
  });
  fireEvent.click(getByText(/Add Reporter/i));

  fireEvent.click(getByText(/^Assign$/i));

  fireEvent.click(getByText(/ASSIGN HERE!/i));

  const activityListRows = getAllByRole("row");
  expect(activityListRows[1].textContent).toContain("Sam");

  cleanup();
});
