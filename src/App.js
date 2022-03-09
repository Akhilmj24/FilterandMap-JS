import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Name, setname] = useState("");
  const [Age, setage] = useState();
  const [Gender, setgender] = useState("Male");
  const [Store, setstore] = useState([]);

  const [nameErr, setnameErr] = useState("");
  const [ageErr, setageErr] = useState("");

  useEffect(() => {
    setstore(JSON.parse(localStorage.getItem("data")));
  }, [Gender]);

  const storeData = () => {
    if (Name === "" && Age === "") {
      alert("Please enter the fields");
    } else {
      setstore([
        ...Store,
        {
          id: Math.floor(Math.random() * 100),
          Name,
          Age,
          Gender,
        },
      ]);
      localStorage.setItem("data", JSON.stringify(Store));
      setname("");
      setage("");
      setgender("Male");
    }
  };

  const validCheck = (props) => (e) => {
    if (props === "name") {
      let name = e.target.value;
      let nameValid = new RegExp(/^[A-Za-z][A-Za-z]{2,29}$/);

      if (name == "") {
        setnameErr("Please enter name");
      } else if (!nameValid.test(name)) {
        setnameErr("Please enter vaild name");
      } else {
        setnameErr("");
      }
    }
    if (props === "age") {
      let age = e.target.value;
      let ageValid = new RegExp(/^[0-9]{1,3}$/);
      if (age == "") {
        setageErr("Please enter age");
      } else if (!ageValid.test(age)) {
        setageErr("Please enter vaild age");
      } else if (age > 130) {
        setageErr("Please enter vaild age");
      } else {
        setageErr("");
      }
    }
  };

  return (
    <div className="App">
      <div className="input_conatiner">
        <label htmlFor="">Name</label>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          value={Name}
          placeholder="Name"
          onBlur={validCheck("name")}
        />
        <small>{nameErr}</small>
        <label htmlFor="">Age</label>
        <input
          type="type"
          onChange={(e) => setage(e.target.value)}
          value={Age}
          placeholder="Age"
          onBlur={validCheck("age")}
        />
        <small>{ageErr}</small>
        <div className="gender">
          <div className="gender_male">
            <label htmlFor="">Male</label>
            <input
              type="radio"
              name="gender"
              value={Gender}
              onChange={(e) => setgender("Male")}
              checked={Gender == "Male"}
            />
          </div>
          <div className="gender_female">
            <label htmlFor="">Female</label>
            <input
              type="radio"
              name="gender"
              value={Gender}
              onChange={(e) => setgender("Female")}
              checked={Gender == "Female"}
            />
          </div>
        </div>
        <button onClick={() => storeData()}>Submit</button>
      </div>
      <div className="table-container">
        <div className="table_male">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            {Store.filter((e) => e.Gender === "Male").map((data, index) => (
              <tbody key={data.id}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.Name}</td>
                  <td>{data.Age}</td>
                  <td>{data.Gender}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="table_female">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            {Store.filter((e) => e.Gender === "Female").map((data, index) => (
              <tbody key={data.id}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data.Name}</td>
                  <td>{data.Age}</td>
                  <td>{data.Gender}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
