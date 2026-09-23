"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Reporter } from "../model";
import { Activity } from "../model";
import { Model } from "../model";
import React from "react";

export function addReporter(m: Model, reporter: Reporter) {
  m.addReporter(reporter);
}

export function addActivity(m: Model, activity: Activity) {
  m.addActivity(activity);
}

export default function Home() {
  const [model, setModel] = React.useState(new Model());
  const [rerender, forceRerender] = React.useState(0);
  const [actName, setActName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [repName, setRepName] = React.useState("");

  // triggers re-render
  function andRefreshDisplay() {
    forceRerender(rerender => rerender + 1);
  }

  // use cases
  function handleAddReporter(reporter: Reporter) {
    try {
      addReporter(model, reporter);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handleRemoveReporter(reporter: Reporter) {}

  function handleAddActivity(activity: Activity) {
    try {
      addActivity(model, activity);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handlePromoteActivity(activity: Activity) {}

  function handleRemoveActivity(activity: Activity) {}

  function handleAssignReporter(activity: Activity, reporter: Reporter): void {}

  // low-level
  function handleSelectReporter(reporter: Reporter) {}

  function handleSelectActivity(activity: Activity) {}

  function handleAssignReporterToSomething() {
    // how to display activties that they can be assigned to?
  }

  return (
    <div>
      <h1>ActivityEditor</h1>

      <main>
        <h2>List of Activities</h2>

        <p>Add a new activity!</p>
        <form>
          <label htmlFor="activityName">Activity Name:</label>
          <input
            value={actName}
            onChange={(e) => setActName(e.target.value)}
            required
          />

          <label htmlFor="activityDesc">Activity Description:</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <button
          type="button"
            onClick={() => handleAddActivity(new Activity(actName, desc))} className="addActivityButton"> Add Activity</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Activity Description</th>
              <th>Assigned Reporter</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {model.activities.map((activity) => (
              <tr key={activity.actName}>
                <td>{activity.actName}</td>
                <td>{activity.description}</td>
                <td>{activity.assignedReporter?.name ?? "Unassigned"}</td>

                <td>
                  {activity.canBePromoted && (
                    <button
                              type="button"

                      className="promoteButton"
                      onClick={() => handlePromoteActivity(activity)}
                    >
                      Promote
                    </button>
                  )}
                </td>
                <td>
                  {activity.canBeRemoved && (
                    <button
                              type="button"

                      className="removeActivityButton"
                      onClick={() => handleRemoveActivity(activity)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>List of Reporters</h2>

        <p>Add a new reporter!</p>
        <form>
          <label htmlFor="reporterName">Reporter Name:</label>
          <input
            value={repName}
            onChange={(e) => setRepName(e.target.value)}
            required
          />
          <button
                    type="button"

            onClick={() => handleAddReporter(new Reporter(repName))} className="addReporterButton"> Add Reporter</button>
          
        </form>

        <table>
          <thead>
            <tr>
              <th>Reporter Name</th>
              <th>Assigned Activity Name</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {model.reporters.map((reporter) => (
              <tr key={reporter.name}>
                <td>{reporter.name}</td>
                <td>{reporter.assignedActivity?.actName ?? "Unassigned"}</td>

                <td>
                  {reporter.canBeAssigned && (
                    <button
                              type="button"

                      className="assignButton"
                      onClick={() => handleAssignReporterToSomething()}
                    >
                      Assign
                    </button>
                  )}
                </td>
                <td>
                  {reporter.canBeRemoved && (
                    <button
                              type="button"

                      className="removeReporterButton"
                      onClick={() => handleRemoveReporter(reporter)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
