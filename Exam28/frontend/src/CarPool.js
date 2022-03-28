import { useState, useEffect } from "react";
import axios from "axios";
const CarPool = () => {
  let [car, setCar] = useState([
    { carname: "", color: "", price: "", in_stock: "" },
  ]);
  useEffect(() => {
    getCars();
  }, []);
  const getCars = () => {
    axios
      .get("/carsqlpool")
      .then((res) => {
        setCar(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let addCar = (event) => {
    event.preventDefault();
    let carObject = {
      carname: event.target.carname.value,
      color: event.target.color.value,
      price: event.target.price.value,
      in_stock: event.target.in_stock.value,
    };
    axios
      .post("/carsqlpool", carObject)
      .then((res) => {
        getCars(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let deleteCar = (carname) => {
    axios
      .delete("/carsqlpool/" + carname)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getCars();
  };
  let deleteAll = () => {
    axios.delete("/carsqlpool").then((res) => {
      console.log(res.data);
    });
    getCars();
  };

  return (
    <div>
      <h1>CAR APLLICATION</h1>
      <form onSubmit={addCar}>
        <b>Enter Car Name</b>
        <br />
        <input type='text' name='carname' />
        <br />
        <b>Enter Price</b>
        <br />
        <input type='number' name='price' />

        <br />
        <b>Select Car color</b>
        <br />
        <select name='color'>
          <option value='black'>black</option>
          <option value='blue'>blue</option>
          <option value='grey'>grey</option>
        </select>

        <br />
        <b>Enter In stock or not (please enter boolean values 1 or 0)</b>
        <input type='boolean' name='in_stock' />

        <br />
        <button className='btn1'>add car</button>
      </form>
      {car.map((val, index) => {
        return (
          <div className='showp'>
            carname:{val.carname}
            <br />
            price:{val.price}
            <br />
            color:{val.color}
            <br />
            in_stock:{val.in_stock}
            <br />
            <button className='btn1' onClick={() => deleteCar(val.carname)}>
              delete
            </button>
          </div>
        );
      })}
      <button className='btn1' onClick={deleteAll}>
        Delete All Cars
      </button>
    </div>
  );
};
export default CarPool;
