import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import EditWorkout from "./EditWorkout";
import CompleteWorkout from "./CompleteWorkout";
import DeleteWorkout from "./DeleteWorkout";

function WorkoutCard({ workoutData, fetchWorkouts }) {

	const [workoutList, setWorkoutList] = useState([]);

	useEffect(() => {

		const workoutsArr = workoutData.map(workout => {
			return (
				<Card key={workout._id} style={{ width: '18rem' }}>
			      	<Card.Body>
			        	<Card.Title>{workout.name}</Card.Title>
			        	<Card.Subtitle>{workout.duration}</Card.Subtitle>
			        	<Card.Text>{workout.status}</Card.Text>
			        	<CompleteWorkout workout={workout} fetchWorkouts={fetchWorkouts} />
			        	<EditWorkout workout={workout} fetchWorkoutData={fetchWorkouts} />
			        	<DeleteWorkout workout={workout} fetchWorkouts={fetchWorkouts} />
			      	</Card.Body>
			    </Card>
			)
		});

		setWorkoutList(workoutsArr);
	}, [workoutData]);

	return (
		<>
		{workoutList}
		</>
	)
}

export default WorkoutCard;