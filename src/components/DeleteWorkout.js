import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Button } from 'react-bootstrap';

function DeleteWorkout({ workout, fetchWorkouts }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	const workoutId = workout._id;

	function deleteWorkout() {

		fetch(`${process.env.REACT_APP_API_URL}/workouts/deleteWorkout/${workoutId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Workout deleted successfully") {
				notyf.success("Workout successfully deleted");
				fetchWorkouts();
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	return (
		<Button className="mx-2" variant="danger" size="sm" onClick={() => deleteWorkout()}>Delete</Button>
	)
}

export default DeleteWorkout;