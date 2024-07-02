import "./DataNotFound.css";

const DataNotFound = (props) => {
  return (
    <>
      <div className="notfound-container">
        <div className="notfound-content">
          <h1 className="notfound-text">{props.data} Not Found</h1>
        </div>
      </div>
    </>
  );
};

export default DataNotFound;
