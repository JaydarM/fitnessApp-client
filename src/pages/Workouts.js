import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import WorkoutCard from "../components/WorkoutCard"

function Workouts() {

	const { user } = useContext(UserContext);

	const [workouts, setWorkouts] =  useState([]);
	const [hasWorkouts, setHasWorkouts] = useState(false);

	useEffect(() => {
		fetchWorkouts();
	}, [user.token])

	const fetchWorkouts = () => {

		fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.workouts && data.workouts.length > 0) {
				setWorkouts(data.workouts);
				setHasWorkouts(true);
			} else {
				setHasWorkouts(false);
			}
		})
	}

	return (
		<>
		<h1 className="my-5 text-center">Workouts</h1>
		{(hasWorkouts) ?
			<WorkoutCard workoutData={workouts} fetchWorkouts={fetchWorkouts} />
			:
			<h3 className="my-5 text-center">No Workouts</h3>
		}
		</>
	)
}

export default Workouts;