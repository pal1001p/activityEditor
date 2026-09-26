"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Reporter } from "../model";
import { Activity } from "../model";
import { Model } from "../model";
import React, { useEffect } from "react";

export function addReporter(m: Model, reporter: Reporter) {
  m.addReporter(reporter);
}

export function addActivity(m: Model, activity: Activity) {
  m.addActivity(activity);
}

export function promoteActivity(m: Model, activity: Activity) {
  m.promoteActivity(activity);
}

export function assignReporter(
  m: Model,
  activity: Activity,
  reporter: Reporter,
) {
  m.assignReporter(activity, reporter);
}

export function removeActivity(m: Model, activity: Activity) {
  m.removeActivity(activity);
}

export function removeReporter(m: Model, reporter: Reporter) {
  m.removeReporter(reporter);
}

export default function Home() {
  const [model, setModel] = React.useState(new Model());
  const [rerender, forceRerender] = React.useState(0);
  const [actName, setActName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [repName, setRepName] = React.useState("");
  const [availableActivities, setAvailableActivities] = React.useState<
    Array<Activity>
  >([]);
  const [reporterBeingAssigned, setReporterBeingAssigned] =
    React.useState<Reporter | null>(null);

  // triggers re-render
  function andRefreshDisplay() {
    forceRerender(rerender + 1);
  }

  // use case controllers
  function handleAddReporter(reporter: Reporter) {
    try {
      addReporter(model, reporter);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handleRemoveReporter(reporter: Reporter) {
    try {
      removeReporter(model, reporter);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handleAddActivity(activity: Activity) {
    try {
      addActivity(model, activity);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handlePromoteActivity(activity: Activity) {
    try {
      promoteActivity(model, activity);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handleRemoveActivity(activity: Activity) {
    try {
      removeActivity(model, activity);
      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  function handleAssignReporter(activity: Activity, reporter: Reporter): void {
    try {
      assignReporter(model, activity, reporter);
      setReporterBeingAssigned(null);

      andRefreshDisplay();
    } catch (error) {
      alert(error);
    }
  }

  // low-level

  function handleSelectReporterToAssign(reporter: Reporter) {
    const available = model.getAvailableActivities();
    setAvailableActivities(available);
    setReporterBeingAssigned(reporter);
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
            id="activityName"
            value={actName}
            onChange={(e) => setActName(e.target.value)}
            disabled={reporterBeingAssigned !== null}
            required
          />

          <label htmlFor="activityDesc">Activity Description:</label>
          <input
            id="activityDesc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            disabled={reporterBeingAssigned !== null}
            required
          />

          <button
            type="button"
            onClick={() => handleAddActivity(new Activity(actName, desc))}
            disabled={reporterBeingAssigned !== null}
            className="addActivityButton"
          >
            {" "}
            Add Activity
          </button>
        </form>
        {reporterBeingAssigned && (
          <button
            type="button"
            className="cancelAssigningButton"
            onClick={() => setReporterBeingAssigned(null)}
          >
            EXIT ASSIGNING
          </button>
        )}
        <table>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Activity Description</th>
              <th>Assigned Reporter</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {model.activities.map((activity) => {
              const available = availableActivities.some(
                (a) => a.actName === activity.actName,
              );

              const newButton = reporterBeingAssigned !== null;

              return (
                <tr key={activity.actName}>
                  <td> {activity.actName}</td>
                  <td>{activity.description}</td>
                  <td>{activity.assignedReporter?.name ?? "Unassigned"}</td>

                  <td>
                    {activity.canBePromoted && (
                      <button
                        type="button"
                        disabled={reporterBeingAssigned !== null}
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
                        disabled={reporterBeingAssigned !== null}
                        className="removeActivityButton"
                        onClick={() => handleRemoveActivity(activity)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                  <td>
                    {available && newButton && (
                      <button
                        type="button"
                        className="assignToActivityButton"
                        onClick={() =>
                          handleAssignReporter(activity, reporterBeingAssigned)
                        }
                      >
                        ASSIGN HERE!
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>List of Reporters</h2>

        <p>Add a new reporter!</p>
        <form>
          <label htmlFor="reporterName">Reporter Name:</label>
          <input
            value={repName}
            id="reporterName"
            disabled={reporterBeingAssigned !== null}
            onChange={(e) => setRepName(e.target.value)}
            required
          />
          <button
            type="button"
            disabled={reporterBeingAssigned !== null}
            onClick={() => handleAddReporter(new Reporter(repName))}
            className="addReporterButton"
          >
            {" "}
            Add Reporter
          </button>
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
                      disabled={reporterBeingAssigned !== null}
                      className="assignButton"
                      onClick={() => handleSelectReporterToAssign(reporter)}
                    >
                      Assign
                    </button>
                  )}
                </td>
                <td>
                  {reporter.canBeRemoved && (
                    <button
                      type="button"
                      disabled={reporterBeingAssigned !== null}
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
