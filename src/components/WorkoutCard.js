import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

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
			        	<Button variant="primary">Edit</Button>
			        	<Button variant="primary">Complete</Button>
			        	<Button variant="primary">Delete</Button>
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