import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Button } from 'react-bootstrap';

function CompleteWorkout({ workout, fetchWorkouts }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	const [isCompleted, setIsCompleted] = useState(false);

	const workoutId = workout._id;

	useEffect(() => {
		if (workout.status === "pending") {
			setIsCompleted(false);
		} else {
			setIsCompleted(true);
		}
	}, [workout.status])

	function completeWorkoutStatus() {

		fetch(`${process.env.REACT_APP_API_URL}/workouts/completeWorkoutStatus/${workoutId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Workout status updated successfully") {
				notyf.success("Successfully Completed");
				setIsCompleted(true);
				fetchWorkouts();
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	return (
		(isCompleted) ?
		<></>
		:
		<Button className="mx-2" variant="warning" size="sm" onClick={() => completeWorkoutStatus()}>Complete</Button>
	)
}

export default CompleteWorkout;