import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const baseUrl = "http://localhost/api/";

  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [dataUsario, setDataUsario] = useState({
    id: "",
    name: "",
    email: "",
    city: "",
    country: "",
    job: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUsario((prevState) => ({
      ...prevState,

      [name]: value,
    }));

    console.log(dataUsario);
  };

  const seleccionarUsuario = (usuario,caso) =>{

    setDataUsario(usuario);

 abrirCerrarModalEditar()

  }


  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };
  const peticionPost = async () => {
    var f = new FormData();

    f.append("id", dataUsario.id);
    f.append("name", dataUsario.name);
    f.append("email", dataUsario.email);
    f.append("city", dataUsario.city);
    f.append("country", dataUsario.country);
    f.append("job", dataUsario.job);
    f.append("METHOD", "POST");

    await axios.post(baseUrl, f).then((response) => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    var f = new FormData();

    f.append("id", dataUsario.id);
    f.append("name", dataUsario.name);
    f.append("email", dataUsario.email);
    f.append("city", dataUsario.city);
    f.append("country", dataUsario.country);
    f.append("job", dataUsario.job);
    f.append("METHOD", "POST");

    await axios.post(baseUrl, f,{params:{id: dataUsario.id}}).then((response) => {
      var dataNueva = data;
      dataNueva.map( Usuario => {
        if(Usuario.id === dataUsario.id ){
          Usuario.id = dataUsario.id
          Usuario.name = dataUsario.name
          Usuario.email = dataUsario.email
          Usuario.city = dataUsario.city
          Usuario.country = dataUsario.country
          Usuario.job = dataUsario.job
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    });
  };

  useEffect(() => {
    peticionGet();
  }, [data]);

  return (
    <div className="App">
      <button
        className="btn btn-success"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Agregar Contacto
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Job</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((Data) => (
            <tr key={Data.id}>
              <td>{Data.id}</td>
              <td>{Data.name}</td>
              <td>{Data.country}</td>
              <td>{Data.city}</td>
              <td>{Data.job}</td>
              <td>{Data.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarUsuario(Data)}>Editar</button>
                &nbsp;
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Contacto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>id:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="id"
              onChange={handleChange}
            ></input>
            <label>name:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
            ></input>
            <label>country:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="country"
              onChange={handleChange}
            ></input>
            <label>city:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="city"
              onChange={handleChange}
            ></input>
            <label>job:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="job"
              onChange={handleChange}
            ></input>
            <label>email:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancerlar
          </button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Contacto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>id:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="id"
              onChange={handleChange}
              value={dataUsario && dataUsario.id}
            ></input>
            <label>name:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={dataUsario && dataUsario.name}
            ></input>
            <label>country:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="country"
              onChange={handleChange}
              value={dataUsario && dataUsario.country}
            ></input>
            <label>city:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="city"
              onChange={handleChange}
              value={dataUsario && dataUsario.city}
            ></input>
            <label>job:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="job"
              onChange={handleChange}
              value={dataUsario && dataUsario.job}
            ></input>
            <label>email:</label>
            <br></br>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={dataUsario && dataUsario.email}
            ></input>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Insertar
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancerlar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;

