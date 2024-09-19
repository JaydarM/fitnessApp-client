import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import UserContext from "../context/UserContext";

function EditWorkout({ workout, fetchWorkoutData }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	const workoutId = workout._id;
	const [name, setName] = useState(workout.name);
	const [duration, setDuration] = useState(workout.duration);

	const [showEdit, setShowEdit] = useState(false);

	function openEdit() {
		setShowEdit(true);
	}

	function closeEdit() {
		setShowEdit(false);
		setName("");
		setDuration("");
	}

	function editWorkout(e, workoutId) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/workouts/updateWorkout/${workoutId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`
			},
			body: JSON.stringify({
				name: name,
				duration: duration
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Workout updated successfully") {
				notyf.success("Workout Updated");
				closeEdit();
				fetchWorkoutData();
			} else {
				notyf.error("Something went wrong");
				closeEdit();
			}
		})
	}

	return (
		<>
		<Button className="mx-2" variant="primary" size="sm" onClick={() => openEdit()}> Edit </Button>

		{/*Edit Product Modal*/}
		<Modal show={showEdit} onHide={closeEdit}>
			<Form onSubmit={e => editWorkout(e, workoutId)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Workout</Modal.Title>
				</Modal.Header>

				<Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={duration} 
                            onChange={e => setDuration(e.target.value)} 
                            required/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
			</Form>
		</Modal>
		</>
	)
}

export default EditWorkout;