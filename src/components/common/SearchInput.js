// --------------------------ANAGHA.S.R--------------------------------

const SearchInput = (props) => {
  return (
    <>
      <div className="container mt-2">
        <div className="row mb-3">
          <div className="col-md-6 offset-md-3 ">
            <div className="input-group">
              <span className="input-group-text" id="search-icon">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="search"
                className="form-control"
                placeholder={props.placeholder}
                aria-label="search"
                aria-describedby="search-icon"
                required
                value={props.value}
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
