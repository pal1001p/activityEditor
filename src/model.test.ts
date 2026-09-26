import { expect, test } from "vitest";
import { Model, Reporter, Activity } from "./model";

test("Model", () => {
  let m = new Model();
  expect(m.activities).toStrictEqual([]);
  expect(m.reporters).toStrictEqual([]);
});

test("Reporter", () => {
  let r = new Reporter("Sammy Smith");
  expect(r.name).toBe("Sammy Smith");
});

test("Activity", () => {
  let a = new Activity("News", "Find some news");
  expect(a.actName).toBe("News");
  expect(a.description).toBe("Find some news");
});

test("Add Activity", () => {
  let m = new Model();
  let a = new Activity("News", "Find some news");
  m.addActivity(a);
  expect(m.activities[0].actName).toBe("News");
  expect(m.activities[0].description).toBe("Find some news");
});

test("Add Reporter", () => {
  let m = new Model();
  let r = new Reporter("Sammy Smith");
  m.addReporter(r);
  expect(m.reporters[0].name).toBe("Sammy Smith");
});

test("Promote Activity", () => {
  let m = new Model();
  let a2 = new Activity("News", "Find some news");
  let a = new Activity("Relax", "Just relax");
  m.addActivity(a);
  m.addActivity(a2);

  m.promoteActivity(a2);
  expect(m.activities[0].actName).toBe("News");
  expect(m.activities[0].description).toBe("Find some news");
  expect(m.activities[0].canBePromoted).toBe(true);
});

test("Assign Activity", () => {
  let m = new Model();
  let a = new Activity("Relax", "Just relax");
  m.addActivity(a);
  let r = new Reporter("Sammy Smith");
  m.addReporter(r);

  m.assignReporter(a, r);
  expect(m.activities[0].assignedReporter?.name).toBe("Sammy Smith");

  expect(m.reporters[0].assignedActivity?.actName).toBe("Relax");
  expect(m.activities[0].canBeAssigned).toBe(false);
  expect(m.activities[0].canBeRemoved).toBe(false);
  expect(m.reporters[0].canBeAssigned).toBe(false);
  expect(m.reporters[0].canBeRemoved).toBe(false);
});

test("Remove Activity", () => {
  let m = new Model();
  let r = new Reporter("Sammy Smith");
  m.addReporter(r);
  let r2 = new Reporter("Hannah");
  m.addReporter(r2);

  m.removeReporter(r);

  expect(m.reporters[0].name).toBe("Hannah");
});

test("Remove Reporter", () => {
  let m = new Model();
  let a2 = new Activity("News", "Find some news");
  let a = new Activity("Relax", "Just relax");
  m.addActivity(a);
  m.addActivity(a2);

  m.removeActivity(a);

  expect(m.activities[0].actName).toBe("News");
});

test("Get Available Activities", () => {
  let m = new Model();
  let a = new Activity("Relax", "Just relax");
  let a2 = new Activity("Hike", "Walk around");
  m.addActivity(a);
  m.addActivity(a2);
  let r = new Reporter("Sammy Smith");
  m.addReporter(r);

  m.assignReporter(a, r);

  expect(m.getAvailableActivities()).toContain(a2);
  expect(m.getAvailableActivities()).not.toContain(a);
});

// for copy pasting
test("", () => {});
