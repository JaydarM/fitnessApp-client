import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Button, Modal, Form } from "react-bootstrap";

function AddWorkout({ fetchWorkoutData }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	// Hooks
	const [name, setName] = useState("");
	const [duration, setDuration] = useState("");

	// Show Add Workout Modal
	const [showAdd, setShowAdd] = useState(false);

	function openAdd() {
		setShowAdd(true);
	}

	function closeAdd() {
		setShowAdd(false);
		setName("");
		setDuration("");
	}

	function createWorkout(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
			method: "POST",
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
			if (data !== undefined) {
				notyf.success("Workout Added!");

				setName("");
				setDuration("");
				closeAdd();
				fetchWorkoutData();
			} else {
				notyf.error("Something went wrong");
				closeAdd();
			}
		})
	}

	return (
		<>
		<Button className="my-3" variant="success" size="lg" onClick={() => openAdd()}> Add Workout </Button>

		<Modal show={showAdd} onHide={closeAdd}>
            <Form onSubmit={e => createWorkout(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Workout</Modal.Title>
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
                    <Button variant="secondary" onClick={closeAdd}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
		</>
	)
}

export default AddWorkout;