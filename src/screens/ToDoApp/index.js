import "./style.scss";
import { useState } from "react";
import {
  resetTodoList,
  setTodoList,
  updateToDoItemStatus,
} from "../../store/actions/todo.actions";
import { connect } from "react-redux";
import BackNavigation from "../../components/BackNavigation";
import { Row, Col, Container, Button } from "react-bootstrap";
import { BiFastForward } from "react-icons/bi";
import CheckBox from "../../components/Checkbox";
import { toast } from "react-toastify";

const ToDo = ({ todoList, updateList, resetList, updateStatus }) => {
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);

  // const [fields, setFields] = useState({});
  // const [errors, setErrors] = useState({});

  const addValue = () => {
    if (task.trim()) {
      let uniq = "id" + new Date().getTime();
      let temp = { id: uniq, title: task, status: false };
      updateList(temp);
      setTask("");
    }
  };

  // const handleValidation = () => {
  //   let fields = fields;
  //   let errors = {};
  //   let formIsValid = true;

  //   // Input
  //   if (!fields["task"]) {
  //     formIsValid = false;
  //     errors["task"] = "Cannot be empty";
  //   }
  //   setErrors({ errors: errors });
  //   return formIsValid;
  // };

  const submitInput = (e) => {
    if (task) {
      e.preventDefault();
      addValue();
      // if (handleValidation()) {
      toast.success("Task Added");
      // } else {
      //   toast.error("Form has errors.");
      // }
    } else {
      toast.error("Please enter a valid task name");
    }
  };
  const handleChange = (field, e) => {
    setTask(e.target.value);

    // let temp = {};
    // temp[field] = e.target.value;
    // // {field:e.target.value}
    // setFields(temp);
    // setFields( {field:e.target.value})
  };

  return (
    <Container fluid className="fluid-container todo-container">
      <BackNavigation title={"ToDo App"} />
      <Row className="todo">
        <Col lg={2} md={1} xs={1} />
        <Col lg={8} md={8} xs={8}>
          <form className="mt-5">
            <div className="form-group mt-5">
              <input
                type="text"
                className="form-control input-value"
                value={task}
                onChange={(e) => handleChange("task", e)}
              />
            </div>
          </form>
        </Col>
        <Col lg={1} md={2} xs={3}>
          <Button
            className="btn btn-primary btn-lg submit-button mt-5"
            // onClick={() => addValue()}
            onClick={(e) => submitInput(e)}
          >
            Submit
          </Button>
        </Col>
        <Col md={1} /> 
      </Row>
      <Row>
        <Col lg={2} md={1}  xs={1} />
        <Col lg={6} md={6} xs={7}>
          <h1 className="todo-title">Todo List</h1>
        </Col>
        {edit ? (
          <Col lg={1} md={2} xs={2}>
            <Button
              variant="danger"
              className="btn btn-danger btn-md edit-btn"
              onClick={() => {
                setEdit(false);
                resetList();
              }}
            >
              Reset
            </Button>
          </Col>
        ) : (
          <Col lg={1} md={2} xs={2} />
        )}
        {todoList.length > 0 && (
          <Col lg={1} md={2} xs={2}>
            <Button
              variant="secondary"
              className="btn btn-default btn-md edit-btn"
              onClick={() => setEdit(!edit)}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Col>
          // <Col md={1} />
        )}
      </Row>
      <Row className="items-list">
        <Col lg={2} md={1} xs={1} />
        <Col lg={8} md={10} xs={10}>
          {todoList.length > 0 &&
            todoList.map((item, index) => {
              return (
                <div key={String(index)}>
                  <Row>
                    <Col lg={11} md={11} xs={11} className="todo-list">
                      <BiFastForward size={18} />
                      <span
                        style={{
                          textDecoration:
                            item.status && !edit ? "line-through" : "none",
                        }}
                      >
                        {item.title} <br />
                      </span>
                    </Col>

                    {edit && (
                      <Col lg={1} md={1} xs={1} className="checkbox-btn">
                        <CheckBox
                          title={""}
                          onCheck={() => updateStatus(item.id)}
                          checked={item.status}
                        />
                      </Col>
                    )}
                  </Row>
                </div>
              );
            })}
        </Col>
        
        <Col lg={2} md={2}  xs={1} />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    todoList: state.todo.list,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateList: (payload) => dispatch(setTodoList(payload)),
  updateStatus: (payload) => dispatch(updateToDoItemStatus(payload)),
  resetList: () => dispatch(resetTodoList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
